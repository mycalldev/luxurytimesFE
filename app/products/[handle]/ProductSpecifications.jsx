import styles from './productSpecifications.module.css';

const SPEC_FIELDS = [
  { key: 'reference',      label: 'Reference' },
  { key: 'model',          label: 'Model' },
  { key: 'dial',           label: 'Dial' },
  { key: 'caseMaterial',   label: 'Case Material' },
  { key: 'caseSize',       label: 'Case Size' },
  { key: 'bezel',          label: 'Bezel' },
  { key: 'crystal',        label: 'Crystal' },
  { key: 'movement',       label: 'Movement' },
  { key: 'powerReserve',   label: 'Power Reserve' },
  { key: 'functions',      label: 'Functions' },
  { key: 'bracelet',       label: 'Bracelet' },
  { key: 'clasp',          label: 'Clasp' },
  { key: 'waterResistance', label: 'Water Resistance' },
];

export default function ProductSpecifications({ product }) {
  const specs = SPEC_FIELDS.filter(({ key }) => product[key]?.value);

  if (specs.length === 0) return null;

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Product Specifications</summary>
      <dl className={styles.list}>
        {specs.map(({ key, label }) => (
          <div key={key} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{product[key].value}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
