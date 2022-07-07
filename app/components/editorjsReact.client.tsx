import Output from 'editorjs-react-renderer';

export default function EditorjsReact(props: any) {
  return (
    <section >
      <Output data={JSON.parse(props.previousData)} />
    </section>
  );
}