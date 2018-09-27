export const processHtml = html => {

	// getting all tags tokens <tag id="" blaa="">
    let tags = html.match(/<([^/].*?)>/gi);

    // extracting tag names `tag` from <tag id="" blaa="">
    let tagNames = tags.map(m => m.length < 250 && /<([^\s^>^!^-]*)>?/.exec(m)[1]).filter(m=> m.length);
    
    let tagNamesCount = {};
    
    // Counting unique tokens
    tagNames.forEach(m => {
      tagNamesCount[m] = tagNamesCount[m] || 0;
      tagNamesCount[m]++;
    });
    
    // generating css classes from tag name
    let styles = "";

    // assinging random background colors to different tags
    Object.keys(tagNamesCount).forEach(m => {
      styles += "." + m + " ." + m + "{";
      let color = ((Math.random() * 0xffffff) << 0).toString(16);
      if (color.length < 6) color += "1";
      styles += `
        background: #${color};
      `;
      styles += "}";
    });

    // Decorating the raw html with generated classes and wrapping tags inside <span> elements
    html = html
      .replace(/[\"\']/gi, "")
      .replace(
        /<(.*?)>/gi,
        `<span class="tag $1"> < $1 ></span><span class="space"> </span>`
      )
      .replace(
        /<span class="tag (.*?)"/gi,
        (match, contents, offset, input_string) => {
          return '<span class="tag ' + /([^\s^>]*)?/.exec(contents)[1] + '"';
        }
      );
    return { html, styles, tagNamesCount };
  };