Custom Block Styles
===================

This plugin is an exploration in customizing site styles without needing to code. Currently, there are two features in this plugin, **custom colors** and **custom block styles**.

## Installing

This is a development repo, so you'll need to build the plugin before it's anything useful.

1. Get a copy of this plugin using the green "Clone or download" button on the right. Regardless of whether you clone or download a zip, you need to build it.
2. `npm install` to install the dependencies.
3. `npm run build` (build once) or `npm start` (keep watching for changes) to compile the code.
4. Activate the plugin.

## Custom Colors

This feature lets editors customize the color palette used for background/text/etc colors in the editor. Colors can be created, changed, renamed, or deleted. Find this interface at Appearance > Custom Colors.

- Use the color picker (click on the color circle) to change the color.
- Rename the color by editing the text.
- Delete any colors you don't want by clicking the trash icon.
- Add more colors for extra options with the Add Color button.
- Reset back to the theme or gutenberg defaults with the Reset button.

Once you save your colors, they'll be available in the Color Settings on any block that supports colors. Check it out on the Group block, Paragraph block, the overlay on the Cover block, etc.

<img src="https://i0.wp.com/ryelle.codes/wp-content/uploads/2019/06/wccbs-custom-colors.png?w=400&ssl=1&zoom=2" alt="" />

*Custom colors screen*

## Custom Block Styles

This feature is more advanced/less polished. It lets editors create ["block styles"]() without having to write JavaScript. Block styles are simple variations on a block made with CSS. They work by adding a className to the block's wrapper. You can create new styles by selecting the block type, and entering in a name for it. The class name will be generated for you, and you can use that in your theme. The newly created style will be available for you immediately, no need to reload the page.

Rough edges:
- This doesn't add any style, just the class name. It assumes you've added the class to your theme.
- You can't preview the style in the editor, unless you've added a theme stylesheet to the editor (currently not possible on WordCamp sites).

<img src="https://i0.wp.com/ryelle.codes/wp-content/uploads/2019/06/wccbs-block-style-sidebar.png?w=400&ssl=1&zoom=2" alt="" />

*Custom Block Styles sidebar*

<img src="https://i0.wp.com/ryelle.codes/wp-content/uploads/2019/06/wccbs-block-style-inspector.png?w=400&ssl=1&zoom=2" alt="" />

*Block style variations in the style switcher*
