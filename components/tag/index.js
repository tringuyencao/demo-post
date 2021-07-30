import styleTag from "./tag.module.css";

export default function Tag({ children }) {
  return (
    <div className={styleTag.tag}>
      {children}
    </div>
  );
}
