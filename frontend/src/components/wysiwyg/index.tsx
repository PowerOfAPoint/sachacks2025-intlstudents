import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
  handleCommandNavigation,
  JSONContent,
  useEditor,
} from "novel";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import "./prosemirror.css";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./slash-command";

export const Editor = forwardRef<
  { content: JSONContent },
  {
    initialContent?: JSONContent;
  }
>((props, ref) => {
  const [content, setContent] = useState<JSONContent>(
    props.initialContent ?? {},
  );

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: EditorInstance }) => {
      const json = editor.getJSON();
      setContent(json);
      // setSaveStatus("Saved");
    },
    500,
  );

  useImperativeHandle(ref, () => ({
    content,
  }));

  return (
    <EditorRoot>
      <EditorContent
        autofocus
        initialContent={content}
        onUpdate={(e) => debouncedUpdates(e)}
        extensions={[...defaultExtensions, slashCommand]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `!p-2 rounded-md prose prose-sm prose-h1:text-3xl prose-h1:font-semibold dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
});
