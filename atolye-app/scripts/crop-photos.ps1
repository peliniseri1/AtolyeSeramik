# Cuts the supplied product photos into one clean image per product (baked-in captions removed)
# and saves high-quality JPEGs to public/images. Run from the atolye-app folder:
#   powershell -ExecutionPolicy Bypass -File scripts/crop-photos.ps1
Add-Type -AssemblyName System.Drawing
$src = Join-Path $PSScriptRoot "..\..\product_photos"
$out = Join-Path $PSScriptRoot "..\public\images"
New-Item -ItemType Directory -Force $out | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L

function Cut($file, $x, $y, $w, $h, $name) {
  $img = [System.Drawing.Image]::FromFile((Get-ChildItem $src -Filter "$file*" | Select-Object -First 1).FullName)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
  $bmp.Save((Join-Path $out $name), $codec, $params)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  "$name  ${w}x${h}"
}

# Hasat: the panel on the wall, caption below removed
Cut "Tenmoku" 0 0 1024 1262 "hasat-wall-panel.jpg"
# İlkbahar: the table setting, caption above removed
Cut "*lkbahar" 0 398 1214 897 "ilkbahar-dinnerware.jpg"
# The combined photo holds two products: left half Fener, right half Lale (white divider at x 656-661)
Cut "Galata" 0 338 655 861 "fener-lampshade.jpg"
Cut "Galata" 664 312 648 887 "lale-vases.jpg"

# Further shots per piece (detail, installed, lit/unlit, single vase) go here as new Cut lines,
# then into that piece's images list in src/data/products.js (e.g. "hasat-detail.jpg").
# Atelier: hands throwing on the wheel, trimmed to an exact 4:3
Cut "8605a8bb" 2 0 1020 765 "atelier.jpg"
# Commission: sketch, glaze test tiles and tools, squared around the table
Cut "4b218693" 0 170 825 825 "commission.jpg"
