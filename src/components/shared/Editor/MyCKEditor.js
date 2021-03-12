import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/es";

export default function MyCKEditor({ data, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={onChange}
      config={{
        spellcheck: false,
        language: "es",
        toolbar: ["heading", "bold", "italic", "numberedList", "bulletedList"],
      }}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setAttribute(
            "spellcheck",
            "false",
            editor.editing.view.document.getRoot()
          );
        });
      }}
    />
  );
}
