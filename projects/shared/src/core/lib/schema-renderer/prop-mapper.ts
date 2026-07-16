import {
  StyleVariant,
  getComponentStyleClasses,
  GlobalStyleContext,
} from "../../../styles/style-registry";

// Maps semantic props to theme CSS classes using global style registry
// Supports:
//   - styleName: named style lookup in componentStyles registry
//   - layout: "flex" | "grid" → ui-flex/ui-grid classes
//   - direction: "row" | "col" → ui-flex-row/ui-flex-col
//   - gap: "xs"|"sm"|"md"|"lg"|"xl" → ui-gap spacing
//   - align: "start"|"center"|"end"|"stretch" → ui-items-*
//   - justify: "start"|"center"|"end"|"between"|"around" → ui-justify-*
//   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → ui-p-*
//   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
//   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → ui-max-w-*
//   - mx: "auto" → ui-mx-auto
//   - fullHeight: true → ui-h-full
//   - rounded: true → ui-rounded-lg
//   - elevation: "low"|"medium"|"high" → elevation classes (theme-specific)
export function mapPropsToClasses(
  componentId: string,
  props: Record<string, unknown>,
  theme: StyleVariant,
  explicitVariant?: string,
  explicitSize?: string,
  globalContext?: GlobalStyleContext,
): string[] {
  const classes: string[] = [];
  if (!props) return classes;

  // 1. Named style from variant/size (explicit props OR globalContext fallback)
  const hasStyle =
    explicitVariant ||
    explicitSize ||
    globalContext?.variant ||
    globalContext?.size;
  if (hasStyle) {
    const classesStr = getComponentStyleClasses(
      theme,
      componentId,
      explicitVariant,
      explicitSize,
      globalContext,
    );
    if (classesStr) {
      classes.push(...classesStr.split(" ").filter((c) => c.trim()));
    }
  }

  // 2. Layout type (flex/grid)
  const layout = props["layout"] as string | undefined;
  if (layout === "flex") classes.push("ui-flex");
  else if (layout === "grid") classes.push("ui-grid");
  else if (layout === "stack") classes.push("ui-flex", "ui-flex-col");

  // 3. Flex direction
  const direction = props["direction"] as string | undefined;
  if (direction === "row") classes.push("ui-flex-row");
  else if (direction === "col") classes.push("ui-flex-col");
  else if (direction === "row-reverse") classes.push("ui-flex-row-reverse");
  else if (direction === "col-reverse") classes.push("ui-flex-col-reverse");

  // 4. Gap spacing (supports both string tokens and numeric values)
  const gap = props["gap"] as string | number | undefined;
  if (gap === "xs" || gap === 1) classes.push("ui-gap-1");
  else if (gap === "sm" || gap === 2) classes.push("ui-gap-2");
  else if (gap === "md" || gap === 3) classes.push("ui-gap-3");
  else if (gap === "lg" || gap === 4) classes.push("ui-gap-4");
  else if (gap === "xl" || gap === 6) classes.push("ui-gap-6");
  else if (gap === "2xl" || gap === 8) classes.push("ui-gap-8");

  // 5. Align items
  const align = props["align"] as string | undefined;
  if (align === "start") classes.push("ui-items-start");
  else if (align === "center") classes.push("ui-items-center");
  else if (align === "end") classes.push("ui-items-end");
  else if (align === "stretch") classes.push("ui-items-stretch");

  // 6. Justify content
  const justify = props["justify"] as string | undefined;
  if (justify === "start") classes.push("ui-justify-start");
  else if (justify === "center") classes.push("ui-justify-center");
  else if (justify === "end") classes.push("ui-justify-end");
  else if (justify === "between") classes.push("ui-justify-between");
  else if (justify === "around") classes.push("ui-justify-around");

  // 7. Padding
  const padding = props["padding"] as string | undefined;
  if (padding === "xs") classes.push("ui-p-1");
  else if (padding === "sm") classes.push("ui-p-2");
  else if (padding === "md") classes.push("ui-p-4");
  else if (padding === "lg") classes.push("ui-p-6");
  else if (padding === "xl") classes.push("ui-p-8");

  // 8. Margin top/bottom
  const marginTop = props["marginTop"] as string | undefined;
  if (marginTop === "xs") classes.push("ui-mt-1");
  else if (marginTop === "sm") classes.push("ui-mt-2");
  else if (marginTop === "md") classes.push("ui-mt-4");
  else if (marginTop === "lg") classes.push("ui-mt-6");
  else if (marginTop === "xl") classes.push("ui-mt-8");

  const marginBottom = props["marginBottom"] as string | undefined;
  if (marginBottom === "xs") classes.push("ui-mb-1");
  else if (marginBottom === "sm") classes.push("ui-mb-2");
  else if (marginBottom === "md") classes.push("ui-mb-4");
  else if (marginBottom === "lg") classes.push("ui-mb-6");
  else if (marginBottom === "xl") classes.push("ui-mb-8");

  // 9. Max width
  const maxWidth = props["maxWidth"] as string | undefined;
  if (maxWidth === "sm") classes.push("ui-max-w-sm");
  else if (maxWidth === "md") classes.push("ui-max-w-md");
  else if (maxWidth === "lg") classes.push("ui-max-w-lg");
  else if (maxWidth === "xl") classes.push("ui-max-w-xl");
  else if (maxWidth === "2xl") classes.push("ui-max-w-2xl");
  else if (maxWidth === "3xl") classes.push("ui-max-w-3xl");
  else if (maxWidth === "6xl") classes.push("ui-max-w-6xl");
  else if (maxWidth === "7xl") classes.push("ui-max-w-7xl");

  // 10. MX auto
  const mx = props["mx"] as string | undefined;
  if (mx === "auto") classes.push("ui-mx-auto");

  // 11. Full height
  const fullHeight = props["fullHeight"] as boolean | undefined;
  if (fullHeight) classes.push("ui-h-full");

  // 12. Rounded
  const rounded = props["rounded"] as boolean | undefined;
  if (rounded) classes.push("ui-rounded-lg");

  // 13. Columns (grid)
  const columns = props["columns"] as string | undefined;
  if (columns) {
    // Support CSS grid column strings like "1fr auto 1fr"
    classes.push(`ui-grid-cols-${columns.replace(/\s+/g, "-")}`);
  }

  // 14. Flex wrap
  const flexWrap = props["flexWrap"] as string | undefined;
  if (flexWrap === "wrap") classes.push("ui-flex-wrap");
  else if (flexWrap === "nowrap") classes.push("ui-flex-nowrap");
  else if (flexWrap === "wrap-reverse") classes.push("ui-flex-wrap-reverse");

  // 15. Flex grow
  const flexGrow = props["flexGrow"] as boolean | undefined;
  if (flexGrow === true) classes.push("ui-flex-grow");
  else if (flexGrow === false) classes.push("ui-flex-grow-0");

  // 16. Flex shrink
  const flexShrink = props["flexShrink"] as boolean | undefined;
  if (flexShrink === true) classes.push("ui-flex-shrink");
  else if (flexShrink === false) classes.push("ui-flex-shrink-0");

  // 17. Flex basis
  const flexBasis = props["flexBasis"] as string | undefined;
  if (flexBasis === "auto") classes.push("ui-basis-auto");
  else if (flexBasis === "full") classes.push("ui-basis-full");
  else if (flexBasis === "half") classes.push("ui-basis-1/2");
  else if (flexBasis === "third") classes.push("ui-basis-1/3");
  else if (flexBasis === "quarter") classes.push("ui-basis-1/4");

  // 18. Align items (container-level)
  const alignItems = props["alignItems"] as string | undefined;
  if (alignItems === "start") classes.push("ui-items-start");
  else if (alignItems === "center") classes.push("ui-items-center");
  else if (alignItems === "end") classes.push("ui-items-end");
  else if (alignItems === "stretch") classes.push("ui-items-stretch");
  else if (alignItems === "baseline") classes.push("ui-items-baseline");

  // 19. Align content (container-level, multi-row)
  const alignContent = props["alignContent"] as string | undefined;
  if (alignContent === "start") classes.push("ui-content-start");
  else if (alignContent === "center") classes.push("ui-content-center");
  else if (alignContent === "end") classes.push("ui-content-end");
  else if (alignContent === "between") classes.push("ui-content-between");
  else if (alignContent === "around") classes.push("ui-content-around");
  else if (alignContent === "evenly") classes.push("ui-content-evenly");

  // 20. Justify items
  const justifyItems = props["justifyItems"] as string | undefined;
  if (justifyItems === "start") classes.push("ui-justify-items-start");
  else if (justifyItems === "center") classes.push("ui-justify-items-center");
  else if (justifyItems === "end") classes.push("ui-justify-items-end");
  else if (justifyItems === "stretch") classes.push("ui-justify-items-stretch");

  // 21. Justify self (item-level)
  const justifySelf = props["justifySelf"] as string | undefined;
  if (justifySelf === "start") classes.push("ui-justify-self-start");
  else if (justifySelf === "center") classes.push("ui-justify-self-center");
  else if (justifySelf === "end") classes.push("ui-justify-self-end");
  else if (justifySelf === "stretch") classes.push("ui-justify-self-stretch");
  else if (justifySelf === "auto") classes.push("ui-justify-self-auto");

  // 22. Align self (item-level)
  const alignSelf = props["alignSelf"] as string | undefined;
  if (alignSelf === "start") classes.push("ui-self-start");
  else if (alignSelf === "center") classes.push("ui-self-center");
  else if (alignSelf === "end") classes.push("ui-self-end");
  else if (alignSelf === "stretch") classes.push("ui-self-stretch");
  else if (alignSelf === "auto") classes.push("ui-self-auto");

  // 23. Row gap (gap-y)
  const rowGap = props["rowGap"] as string | undefined;
  if (rowGap === "xs") classes.push("ui-gap-y-1");
  else if (rowGap === "sm") classes.push("ui-gap-y-2");
  else if (rowGap === "md") classes.push("ui-gap-y-4");
  else if (rowGap === "lg") classes.push("ui-gap-y-6");
  else if (rowGap === "xl") classes.push("ui-gap-y-8");

  // 24. Column gap (gap-x)
  const colGap = props["colGap"] as string | undefined;
  if (colGap === "xs") classes.push("ui-gap-x-1");
  else if (colGap === "sm") classes.push("ui-gap-x-2");
  else if (colGap === "md") classes.push("ui-gap-x-4");
  else if (colGap === "lg") classes.push("ui-gap-x-6");
  else if (colGap === "xl") classes.push("ui-gap-x-8");

  // 25. Width
  const width = props["width"] as string | undefined;
  if (width === "full") classes.push("ui-w-full");
  else if (width === "auto") classes.push("ui-w-auto");
  else if (width === "screen") classes.push("ui-w-screen");
  else if (width === "fit") classes.push("ui-w-fit");

  // 26. Height
  const height = props["height"] as string | undefined;
  if (height === "full") classes.push("ui-h-full");
  else if (height === "auto") classes.push("ui-h-auto");
  else if (height === "screen") classes.push("ui-h-screen");
  else if (height === "fit") classes.push("ui-h-fit");

  // 27. Margin X (mx)
  const marginX = props["marginX"] as string | undefined;
  if (marginX === "auto") classes.push("ui-mx-auto");
  else if (marginX === "xs") classes.push("ui-mx-1");
  else if (marginX === "sm") classes.push("ui-mx-2");
  else if (marginX === "md") classes.push("ui-mx-4");
  else if (marginX === "lg") classes.push("ui-mx-6");
  else if (marginX === "xl") classes.push("ui-mx-8");

  // 28. Margin Y (my)
  const marginY = props["marginY"] as string | undefined;
  if (marginY === "xs") classes.push("ui-my-1");
  else if (marginY === "sm") classes.push("ui-my-2");
  else if (marginY === "md") classes.push("ui-my-4");
  else if (marginY === "lg") classes.push("ui-my-6");
  else if (marginY === "xl") classes.push("ui-my-8");

  // 29. Padding X (px)
  const paddingX = props["paddingX"] as string | undefined;
  if (paddingX === "xs") classes.push("ui-px-1");
  else if (paddingX === "sm") classes.push("ui-px-2");
  else if (paddingX === "md") classes.push("ui-px-4");
  else if (paddingX === "lg") classes.push("ui-px-6");
  else if (paddingX === "xl") classes.push("ui-px-8");

  // 30. Padding Y (py)
  const paddingY = props["paddingY"] as string | undefined;
  if (paddingY === "xs") classes.push("ui-py-1");
  else if (paddingY === "sm") classes.push("ui-py-2");
  else if (paddingY === "md") classes.push("ui-py-4");
  else if (paddingY === "lg") classes.push("ui-py-6");
  else if (paddingY === "xl") classes.push("ui-py-8");

  // 31. Responsive breakpoints (sm:, md:, lg:)
  const responsive = props["responsive"] as
    Record<string, Record<string, unknown>> | undefined;
  if (responsive) {
    const gapMap: Record<string, string> = {
      xs: "1",
      sm: "2",
      md: "4",
      lg: "6",
      xl: "8",
    };

    // sm: breakpoint (640px+)
    if (responsive["sm"]) {
      const sm = responsive["sm"];
      if (sm["layout"] === "flex") classes.push("ui-sm-flex");
      if (sm["layout"] === "grid") classes.push("ui-sm-grid");
      if (sm["direction"] === "row") classes.push("ui-sm-flex-row");
      if (sm["direction"] === "col") classes.push("ui-sm-flex-col");
      if (sm["gap"] && gapMap[sm["gap"] as string])
        classes.push(`ui-sm-gap-${gapMap[sm["gap"] as string]}`);
      if (sm["align"] === "center") classes.push("ui-sm-items-center");
      if (sm["align"] === "start") classes.push("ui-sm-items-start");
      if (sm["align"] === "end") classes.push("ui-sm-items-end");
      if (sm["justify"] === "center") classes.push("ui-sm-justify-center");
      if (sm["justify"] === "start") classes.push("ui-sm-justify-start");
      if (sm["justify"] === "end") classes.push("ui-sm-justify-end");
      if (sm["flexWrap"] === "wrap") classes.push("ui-sm-flex-wrap");
      if (sm["padding"] === "md") classes.push("ui-sm-p-4");
      if (sm["padding"] === "lg") classes.push("ui-sm-p-6");
    }

    // md: breakpoint (768px+)
    if (responsive["md"]) {
      const md = responsive["md"];
      if (md["layout"] === "flex") classes.push("ui-md-flex");
      if (md["layout"] === "grid") classes.push("ui-md-grid");
      if (md["direction"] === "row") classes.push("ui-md-flex-row");
      if (md["direction"] === "col") classes.push("ui-md-flex-col");
      if (md["gap"] && gapMap[md["gap"] as string])
        classes.push(`ui-md-gap-${gapMap[md["gap"] as string]}`);
      if (md["align"] === "center") classes.push("ui-md-items-center");
      if (md["align"] === "start") classes.push("ui-md-items-start");
      if (md["align"] === "end") classes.push("ui-md-items-end");
      if (md["justify"] === "center") classes.push("ui-md-justify-center");
      if (md["justify"] === "start") classes.push("ui-md-justify-start");
      if (md["justify"] === "end") classes.push("ui-md-justify-end");
      if (md["justify"] === "between") classes.push("ui-md-justify-between");
      if (md["flexWrap"] === "wrap") classes.push("ui-md-flex-wrap");
      if (md["padding"] === "md") classes.push("ui-md-p-4");
      if (md["padding"] === "lg") classes.push("ui-md-p-6");
    }

    // lg: breakpoint (1024px+)
    if (responsive["lg"]) {
      const lg = responsive["lg"];
      if (lg["layout"] === "flex") classes.push("ui-lg-flex");
      if (lg["layout"] === "grid") classes.push("ui-lg-grid");
      if (lg["direction"] === "row") classes.push("ui-lg-flex-row");
      if (lg["direction"] === "col") classes.push("ui-lg-flex-col");
      if (lg["gap"] && gapMap[lg["gap"] as string])
        classes.push(`ui-lg-gap-${gapMap[lg["gap"] as string]}`);
      if (lg["align"] === "center") classes.push("ui-lg-items-center");
      if (lg["justify"] === "center") classes.push("ui-lg-justify-center");
      if (lg["justify"] === "between") classes.push("ui-lg-justify-between");
      if (lg["padding"] === "md") classes.push("ui-lg-p-4");
      if (lg["padding"] === "lg") classes.push("ui-lg-p-6");
    }
  }

  // 32. Text size
  const textSize = props["textSize"] as string | undefined;
  if (textSize === "xs") classes.push("ui-text-xs");
  else if (textSize === "sm") classes.push("ui-text-sm");
  else if (textSize === "base") classes.push("ui-text-base");
  else if (textSize === "lg") classes.push("ui-text-lg");
  else if (textSize === "xl") classes.push("ui-text-xl");
  else if (textSize === "2xl") classes.push("ui-text-2xl");
  else if (textSize === "3xl") classes.push("ui-text-3xl");

  // 33. Font weight
  const fontWeight = props["fontWeight"] as string | undefined;
  if (fontWeight === "light") classes.push("ui-font-light");
  else if (fontWeight === "normal") classes.push("ui-font-normal");
  else if (fontWeight === "medium") classes.push("ui-font-medium");
  else if (fontWeight === "semibold") classes.push("ui-font-semibold");
  else if (fontWeight === "bold") classes.push("ui-font-bold");

  // 34. Position
  const position = props["position"] as string | undefined;
  if (position === "relative") classes.push("ui-relative");
  else if (position === "absolute") classes.push("ui-absolute");
  else if (position === "fixed") classes.push("ui-fixed");
  else if (position === "sticky") classes.push("ui-sticky");

  // 35. Z-index
  const zIndex = props["zIndex"] as string | number | undefined;
  if (zIndex === 10 || zIndex === "10") classes.push("ui-z-10");
  else if (zIndex === 20 || zIndex === "20") classes.push("ui-z-20");
  else if (zIndex === 30 || zIndex === "30") classes.push("ui-z-30");
  else if (zIndex === 40 || zIndex === "40") classes.push("ui-z-40");
  else if (zIndex === 50 || zIndex === "50") classes.push("ui-z-50");

  return classes;
}
