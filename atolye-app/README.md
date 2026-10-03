# Studio Atölye Seramik — React uygulaması

İlk HTML sayfasının React'e (Vite + React) dönüştürülmüş hâli. Telefon formatında, bir mobil uygulama gibi çalışır: telefonda tam ekran açılır, bilgisayarda bir telefon çerçevesinin içinde görünür.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # yayın için dist/ klasörü
npm run lint
```

## Bileşenler

| Bileşen | Görevi |
|---|---|
| `src/components/ProductImage.jsx` | Ürün fotoğrafı. Fotoğraf yoksa ya da yüklenemezse "Fotoğraf yakında" çerçevesini gösterir. |
| `src/components/ProductCard.jsx` | Tek ürün: kod, ad, tür, hikâye, özellikler, fiyat, **Sorun** butonu ve kaydet (kalp) butonu. `featured` ve `compact` görünümleri vardır. |
| `src/components/ProductList.jsx` | Dört ürünlük katalog. İlk ürün öne çıkan eserdir; ardından "Atölye duvarı" karoları gelir (dokununca ilgili ürüne kaydırır), sonra diğer ürünler. |

Diğer parçalar: `AppBar` (marka ve TR/EN), `TabBar` (alt menü), `EnquirySheet` (Sorun'a basınca açılan WhatsApp / e-posta paneli), `CommissionTile` ve `Dip` (sır daldırma çizgisi).

Ekranlar (`src/screens/`): Koleksiyon, Siparişe özel (5 adımlı soru akışı), Kayıtlı (beğenilenler ve talepler), Atölye (hikâye, vaatler, ziyaret randevusu).

## Veriyi değiştirmek

- Ürünler: `src/data/products.js`. Adlar, hikâyeler ve fiyatlar örnek içeriktir; gerçek bilgilerle değiştirin.
- Tüm metinler (TR/EN): `src/i18n.jsx`
- WhatsApp numarası, e-posta ve n8n adresi: `src/lib/contact.js`
- Fotoğraflar: `public/images/`. Orijinaller `../product_photos/` klasöründedir. `scripts/crop-photos.ps1` bu dosyaları ürün başına bir görsele böler ve üzerlerindeki yazıları kırpar.
