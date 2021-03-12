import { lazy, useState, useEffect, Suspense } from "react";
import "../../../static/styles/editor/styles.css";

const MyCKEditor = lazy(() => import("./MyCKEditor"));

export default function Editor({ data, onChange }) {
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    setEditor(
      <Suspense fallback={<div>Cargando...</div>}>
        <MyCKEditor data={data} onChange={onChange} />
      </Suspense>
    );

    return () => setEditor(null);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {editor && editor}
      {editor === null && <div>Cargando...</div>}
    </>
  );
}
