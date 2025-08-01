import parse, { domToReact, Element, HTMLReactParserOptions } from "html-react-parser";
import { ReactNode } from "react";

function parseStyle(styleStr: string): Record<string, string> {
  return styleStr
    .split(";")
    .filter(Boolean)
    .reduce((acc, rule) => {
      const [key, value] = rule.split(":");
      if (!key || !value) return acc;
      const camelKey = key.trim().replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      acc[camelKey] = value.trim();
      return acc;
    }, {} as Record<string, string>);
}

export function parseBody(html: string, styles: Record<string, string>): ReactNode[] {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (
        node.type === "tag" &&
        node instanceof Element &&
        node.name === "figure" &&
        node.attribs?.class === "image" &&
        node.children.length === 1 &&
        node.children[0] instanceof Element &&
        node.children[0].name === "img"
      ) {
        const imgEl = node.children[0] as Element;
        const { style, ...restAttribs } = imgEl.attribs;

        return (
          <img
            className={styles.albumImg}
            {...restAttribs}
            style={style ? parseStyle(style) : undefined}
          />
        );
      }
    },
  };

  const parsed = parse(html, options);
  const result: ReactNode[] = [];
  const albumGroup: ReactNode[] = [];

  const flushAlbum = () => {
    if (albumGroup.length > 0) {
      const count = albumGroup.length;
      const layoutClass = styles[`albumLayout_${count}`];
  
      result.push(
        <div className={`${styles.album} ${layoutClass}`} key={`album-${result.length}`}>
          {albumGroup.map((elem, ind) => (
            <div 
              className={`${styles.containerImg} ${albumGroup.length%2!==0 && ind === 0? styles.bigContainerImg: ''}`} 
              key={ind}
            >
              {elem}
            </div>
          ))}
        </div>
      );
  
      albumGroup.length = 0;
    }
  };

  const arrayParsed = Array.isArray(parsed) ? parsed : [parsed];

  arrayParsed.forEach((node, index) => {
    if (
      typeof node === "object" &&
      node !== null &&
      "props" in node &&
      node.type === "img" &&
      node.props?.className === styles.albumImg
    ) {
      albumGroup.push(<img key={`img-${index}`} {...node.props} />);
    } else {
      flushAlbum();
      result.push(<div key={index}>{node}</div>);
    }
  });

  flushAlbum();

  return result;
}


export function parseOnlyText(html: string): string {
  return html
    .replace(/<figure.*?>.*?<\/figure>/gs, " ") 
    .replace(/<[^>]+>/g, " ") 
    .replace(/\s+/g, " ") 
    .trim();
}
