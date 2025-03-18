interface IconProps {
  name: 'edit' | 'save' | 'refresh' | 'left' | 'right';
}

const Icon = (props: IconProps) => {
  const icons = {
    edit: '✏️',
    save: '📂',
    refresh: '🔄',
    left: '◀️',
    right: '▶️',
  };
  return <span>{icons[props.name]}</span>;
};

export default Icon;