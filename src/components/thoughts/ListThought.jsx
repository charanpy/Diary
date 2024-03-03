import sanitizeHtml from "sanitize-html";

const ListThought = ({ thought }) => {
  return (
    <section className="my-6 flex flex-col md:p-6">
      <h1 className="text-2xl text-slate-700 dark:text-slate-300 mb-2 capitalize">
        {thought?.title}
      </h1>
      <p className="text-slate-600 dark:text-slate-500">
        {new Date(thought?.created_at).toDateString()}{" "}
        {new Date(thought?.created_at).toLocaleTimeString()}
      </p>

      <div
        className="my-8 leading-10 myThoughts"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(thought.content) }}
      />
    </section>
  );
};

export default ListThought;
