import { useLang } from '../i18n.jsx'
import { BrushIcon, HeartIcon, KilnIcon, TileIcon } from './Icons.jsx'

const tabs = [
  { id: 'collection', Icon: TileIcon },
  { id: 'commission', Icon: BrushIcon },
  { id: 'saved', Icon: HeartIcon },
  { id: 'atelier', Icon: KilnIcon },
]

export default function TabBar({ current, onChange, badge = 0 }) {
  const { t } = useLang()
  return (
    <nav className="tab-bar" aria-label="Menü">
      {tabs.map(({ id, Icon }) => (
        <button key={id} type="button" className="tab-bar__item" aria-current={current === id ? 'page' : undefined}
          onClick={() => onChange(id)}>
          <span className="tab-bar__icon">
            <Icon />
            {id === 'saved' && badge > 0 && <span className="tab-bar__badge">{badge}</span>}
          </span>
          <span className="tab-bar__label">{t.tabs[id]}</span>
        </button>
      ))}
    </nav>
  )
}
