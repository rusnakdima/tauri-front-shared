import {
  StyleVariant,
  getComponentStyleClasses,
  GlobalStyleContext,
} from "../../../styles/style-registry";

// Maps semantic props to theme CSS classes using global style registry
// Supports:
//   - styleName: named style lookup in componentStyles registry
//   - layout: "flex" | "grid" → sf-flex/sf-grid classes
//   - direction: "row" | "col" → sf-flex-row/sf-flex-col
//   - gap: "xs"|"sm"|"md"|"lg"|"xl" → sf-gap spacing
//   - align: "start"|"center"|"end"|"stretch" → sf-items-*
//   - justify: "start"|"center"|"end"|"between"|"around" → sf-justify-*
//   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → sf-p-*
//   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
//   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → sf-max-w-*
//   - mx: "auto" → sf-mx-auto
//   - fullHeight: true → sf-h-full
//   - rounded: true → sf-rounded-lg
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
  if (layout === "flex") classes.push("sf-flex");
  else if (layout === "grid") classes.push("sf-grid");
  else if (layout === "stack") classes.push("sf-flex", "sf-flex-col");

  // 3. Flex direction
  const direction = props["direction"] as string | undefined;
  if (direction === "row") classes.push("sf-flex-row");
  else if (direction === "col") classes.push("sf-flex-col");
  else if (direction === "row-reverse") classes.push("sf-flex-row-reverse");
  else if (direction === "col-reverse") classes.push("sf-flex-col-reverse");

  // 4. Gap spacing (supports both string tokens and numeric values)
  const gap = props["gap"] as string | number | undefined;
  if (gap === "xs" || gap === 1) classes.push("sf-gap-1");
  else if (gap === "sm" || gap === 2) classes.push("sf-gap-2");
  else if (gap === "md" || gap === 3) classes.push("sf-gap-3");
  else if (gap === "lg" || gap === 4) classes.push("sf-gap-4");
  else if (gap === "xl" || gap === 6) classes.push("sf-gap-6");
  else if (gap === "2xl" || gap === 8) classes.push("sf-gap-8");

  // 5. Align items
  const align = props["align"] as string | undefined;
  if (align === "start") classes.push("sf-items-start");
  else if (align === "center") classes.push("sf-items-center");
  else if (align === "end") classes.push("sf-items-end");
  else if (align === "stretch") classes.push("sf-items-stretch");

  // 6. Justify content
  const justify = props["justify"] as string | undefined;
  if (justify === "start") classes.push("sf-justify-start");
  else if (justify === "center") classes.push("sf-justify-center");
  else if (justify === "end") classes.push("sf-justify-end");
  else if (justify === "between") classes.push("sf-justify-between");
  else if (justify === "around") classes.push("sf-justify-around");

  // 7. Padding
  const padding = props["padding"] as string | undefined;
  if (padding === "xs") classes.push("sf-p-1");
  else if (padding === "sm") classes.push("sf-p-2");
  else if (padding === "md") classes.push("sf-p-4");
  else if (padding === "lg") classes.push("sf-p-6");
  else if (padding === "xl") classes.push("sf-p-8");

  // 8. Margin top/bottom
  const marginTop = props["marginTop"] as string | undefined;
  if (marginTop === "xs") classes.push("sf-mt-1");
  else if (marginTop === "sm") classes.push("sf-mt-2");
  else if (marginTop === "md") classes.push("sf-mt-4");
  else if (marginTop === "lg") classes.push("sf-mt-6");
  else if (marginTop === "xl") classes.push("sf-mt-8");

  const marginBottom = props["marginBottom"] as string | undefined;
  if (marginBottom === "xs") classes.push("sf-mb-1");
  else if (marginBottom === "sm") classes.push("sf-mb-2");
  else if (marginBottom === "md") classes.push("sf-mb-4");
  else if (marginBottom === "lg") classes.push("sf-mb-6");
  else if (marginBottom === "xl") classes.push("sf-mb-8");

  // 9. Max width
  const maxWidth = props["maxWidth"] as string | undefined;
  if (maxWidth === "sm") classes.push("sf-max-w-sm");
  else if (maxWidth === "md") classes.push("sf-max-w-md");
  else if (maxWidth === "lg") classes.push("sf-max-w-lg");
  else if (maxWidth === "xl") classes.push("sf-max-w-xl");
  else if (maxWidth === "2xl") classes.push("sf-max-w-2xl");
  else if (maxWidth === "3xl") classes.push("sf-max-w-3xl");
  else if (maxWidth === "6xl") classes.push("sf-max-w-6xl");
  else if (maxWidth === "7xl") classes.push("sf-max-w-7xl");

  // 10. MX auto
  const mx = props["mx"] as string | undefined;
  if (mx === "auto") classes.push("sf-mx-auto");

  // 11. Full height
  const fullHeight = props["fullHeight"] as boolean | undefined;
  if (fullHeight) classes.push("sf-h-full");

  // 12. Rounded
  const rounded = props["rounded"] as boolean | undefined;
  if (rounded) classes.push("sf-rounded-lg");

  // 13. Columns (grid)
  const columns = props["columns"] as string | undefined;
  if (columns) {
    // Support CSS grid column strings like "1fr auto 1fr"
    classes.push(`sf-grid-cols-${columns.replace(/\s+/g, "-")}`);
  }

  // 14. Flex wrap
  const flexWrap = props["flexWrap"] as string | undefined;
  if (flexWrap === "wrap") classes.push("sf-flex-wrap");
  else if (flexWrap === "nowrap") classes.push("sf-flex-nowrap");
  else if (flexWrap === "wrap-reverse") classes.push("sf-flex-wrap-reverse");

  // 15. Flex grow
  const flexGrow = props["flexGrow"] as boolean | undefined;
  if (flexGrow === true) classes.push("sf-flex-grow");
  else if (flexGrow === false) classes.push("sf-flex-grow-0");

  // 16. Flex shrink
  const flexShrink = props["flexShrink"] as boolean | undefined;
  if (flexShrink === true) classes.push("sf-flex-shrink");
  else if (flexShrink === false) classes.push("sf-flex-shrink-0");

  // 17. Flex basis
  const flexBasis = props["flexBasis"] as string | undefined;
  if (flexBasis === "auto") classes.push("sf-basis-auto");
  else if (flexBasis === "full") classes.push("sf-basis-full");
  else if (flexBasis === "half") classes.push("sf-basis-1/2");
  else if (flexBasis === "third") classes.push("sf-basis-1/3");
  else if (flexBasis === "quarter") classes.push("sf-basis-1/4");

  // 18. Align items (container-level)
  const alignItems = props["alignItems"] as string | undefined;
  if (alignItems === "start") classes.push("sf-items-start");
  else if (alignItems === "center") classes.push("sf-items-center");
  else if (alignItems === "end") classes.push("sf-items-end");
  else if (alignItems === "stretch") classes.push("sf-items-stretch");
  else if (alignItems === "baseline") classes.push("sf-items-baseline");

  // 19. Align content (container-level, multi-row)
  const alignContent = props["alignContent"] as string | undefined;
  if (alignContent === "start") classes.push("sf-content-start");
  else if (alignContent === "center") classes.push("sf-content-center");
  else if (alignContent === "end") classes.push("sf-content-end");
  else if (alignContent === "between") classes.push("sf-content-between");
  else if (alignContent === "around") classes.push("sf-content-around");
  else if (alignContent === "evenly") classes.push("sf-content-evenly");

  // 20. Justify items
  const justifyItems = props["justifyItems"] as string | undefined;
  if (justifyItems === "start") classes.push("sf-justify-items-start");
  else if (justifyItems === "center") classes.push("sf-justify-items-center");
  else if (justifyItems === "end") classes.push("sf-justify-items-end");
  else if (justifyItems === "stretch") classes.push("sf-justify-items-stretch");

  // 21. Justify self (item-level)
  const justifySelf = props["justifySelf"] as string | undefined;
  if (justifySelf === "start") classes.push("sf-justify-self-start");
  else if (justifySelf === "center") classes.push("sf-justify-self-center");
  else if (justifySelf === "end") classes.push("sf-justify-self-end");
  else if (justifySelf === "stretch") classes.push("sf-justify-self-stretch");
  else if (justifySelf === "auto") classes.push("sf-justify-self-auto");

  // 22. Align self (item-level)
  const alignSelf = props["alignSelf"] as string | undefined;
  if (alignSelf === "start") classes.push("sf-self-start");
  else if (alignSelf === "center") classes.push("sf-self-center");
  else if (alignSelf === "end") classes.push("sf-self-end");
  else if (alignSelf === "stretch") classes.push("sf-self-stretch");
  else if (alignSelf === "auto") classes.push("sf-self-auto");

  // 23. Row gap (gap-y)
  const rowGap = props["rowGap"] as string | undefined;
  if (rowGap === "xs") classes.push("sf-gap-y-1");
  else if (rowGap === "sm") classes.push("sf-gap-y-2");
  else if (rowGap === "md") classes.push("sf-gap-y-4");
  else if (rowGap === "lg") classes.push("sf-gap-y-6");
  else if (rowGap === "xl") classes.push("sf-gap-y-8");

  // 24. Column gap (gap-x)
  const colGap = props["colGap"] as string | undefined;
  if (colGap === "xs") classes.push("sf-gap-x-1");
  else if (colGap === "sm") classes.push("sf-gap-x-2");
  else if (colGap === "md") classes.push("sf-gap-x-4");
  else if (colGap === "lg") classes.push("sf-gap-x-6");
  else if (colGap === "xl") classes.push("sf-gap-x-8");

  // 25. Width
  const width = props["width"] as string | undefined;
  if (width === "full") classes.push("sf-w-full");
  else if (width === "auto") classes.push("sf-w-auto");
  else if (width === "screen") classes.push("sf-w-screen");
  else if (width === "fit") classes.push("sf-w-fit");

  // 26. Height
  const height = props["height"] as string | undefined;
  if (height === "full") classes.push("sf-h-full");
  else if (height === "auto") classes.push("sf-h-auto");
  else if (height === "screen") classes.push("sf-h-screen");
  else if (height === "fit") classes.push("sf-h-fit");

  // 27. Margin X (mx)
  const marginX = props["marginX"] as string | undefined;
  if (marginX === "auto") classes.push("sf-mx-auto");
  else if (marginX === "xs") classes.push("sf-mx-1");
  else if (marginX === "sm") classes.push("sf-mx-2");
  else if (marginX === "md") classes.push("sf-mx-4");
  else if (marginX === "lg") classes.push("sf-mx-6");
  else if (marginX === "xl") classes.push("sf-mx-8");

  // 28. Margin Y (my)
  const marginY = props["marginY"] as string | undefined;
  if (marginY === "xs") classes.push("sf-my-1");
  else if (marginY === "sm") classes.push("sf-my-2");
  else if (marginY === "md") classes.push("sf-my-4");
  else if (marginY === "lg") classes.push("sf-my-6");
  else if (marginY === "xl") classes.push("sf-my-8");

  // 29. Padding X (px)
  const paddingX = props["paddingX"] as string | undefined;
  if (paddingX === "xs") classes.push("sf-px-1");
  else if (paddingX === "sm") classes.push("sf-px-2");
  else if (paddingX === "md") classes.push("sf-px-4");
  else if (paddingX === "lg") classes.push("sf-px-6");
  else if (paddingX === "xl") classes.push("sf-px-8");

  // 30. Padding Y (py)
  const paddingY = props["paddingY"] as string | undefined;
  if (paddingY === "xs") classes.push("sf-py-1");
  else if (paddingY === "sm") classes.push("sf-py-2");
  else if (paddingY === "md") classes.push("sf-py-4");
  else if (paddingY === "lg") classes.push("sf-py-6");
  else if (paddingY === "xl") classes.push("sf-py-8");

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
      if (sm["layout"] === "flex") classes.push("sf-sm:flex");
      if (sm["layout"] === "grid") classes.push("sf-sm:grid");
      if (sm["direction"] === "row") classes.push("sf-sm:flex-row");
      if (sm["direction"] === "col") classes.push("sf-sm:flex-col");
      if (sm["gap"] && gapMap[sm["gap"] as string])
        classes.push(`sf-sm:gap-${gapMap[sm["gap"] as string]}`);
      if (sm["align"] === "center") classes.push("sf-sm:items-center");
      if (sm["align"] === "start") classes.push("sf-sm:items-start");
      if (sm["align"] === "end") classes.push("sf-sm:items-end");
      if (sm["justify"] === "center") classes.push("sf-sm:justify-center");
      if (sm["justify"] === "start") classes.push("sf-sm:justify-start");
      if (sm["justify"] === "end") classes.push("sf-sm:justify-end");
      if (sm["flexWrap"] === "wrap") classes.push("sf-sm:flex-wrap");
      if (sm["padding"] === "md") classes.push("sf-sm:p-4");
      if (sm["padding"] === "lg") classes.push("sf-sm:p-6");
    }

    // md: breakpoint (768px+)
    if (responsive["md"]) {
      const md = responsive["md"];
      if (md["layout"] === "flex") classes.push("sf-md:flex");
      if (md["layout"] === "grid") classes.push("sf-md:grid");
      if (md["direction"] === "row") classes.push("sf-md:flex-row");
      if (md["direction"] === "col") classes.push("sf-md:flex-col");
      if (md["gap"] && gapMap[md["gap"] as string])
        classes.push(`sf-md:gap-${gapMap[md["gap"] as string]}`);
      if (md["align"] === "center") classes.push("sf-md:items-center");
      if (md["align"] === "start") classes.push("sf-md:items-start");
      if (md["align"] === "end") classes.push("sf-md:items-end");
      if (md["justify"] === "center") classes.push("sf-md:justify-center");
      if (md["justify"] === "start") classes.push("sf-md:justify-start");
      if (md["justify"] === "end") classes.push("sf-md:justify-end");
      if (md["justify"] === "between") classes.push("sf-md:justify-between");
      if (md["flexWrap"] === "wrap") classes.push("sf-md:flex-wrap");
      if (md["padding"] === "md") classes.push("sf-md:p-4");
      if (md["padding"] === "lg") classes.push("sf-md:p-6");
    }

    // lg: breakpoint (1024px+)
    if (responsive["lg"]) {
      const lg = responsive["lg"];
      if (lg["layout"] === "flex") classes.push("sf-lg:flex");
      if (lg["layout"] === "grid") classes.push("sf-lg:grid");
      if (lg["direction"] === "row") classes.push("sf-lg:flex-row");
      if (lg["direction"] === "col") classes.push("sf-lg:flex-col");
      if (lg["gap"] && gapMap[lg["gap"] as string])
        classes.push(`sf-lg:gap-${gapMap[lg["gap"] as string]}`);
      if (lg["align"] === "center") classes.push("sf-lg:items-center");
      if (lg["justify"] === "center") classes.push("sf-lg:justify-center");
      if (lg["justify"] === "between") classes.push("sf-lg:justify-between");
      if (lg["padding"] === "md") classes.push("sf-lg:p-4");
      if (lg["padding"] === "lg") classes.push("sf-lg:p-6");
    }
  }

  // 32. Text size
  const textSize = props["textSize"] as string | undefined;
  if (textSize === "xs") classes.push("sf-text-xs");
  else if (textSize === "sm") classes.push("sf-text-sm");
  else if (textSize === "base") classes.push("sf-text-base");
  else if (textSize === "lg") classes.push("sf-text-lg");
  else if (textSize === "xl") classes.push("sf-text-xl");
  else if (textSize === "2xl") classes.push("sf-text-2xl");
  else if (textSize === "3xl") classes.push("sf-text-3xl");

  // 33. Font weight
  const fontWeight = props["fontWeight"] as string | undefined;
  if (fontWeight === "light") classes.push("sf-font-light");
  else if (fontWeight === "normal") classes.push("sf-font-normal");
  else if (fontWeight === "medium") classes.push("sf-font-medium");
  else if (fontWeight === "semibold") classes.push("sf-font-semibold");
  else if (fontWeight === "bold") classes.push("sf-font-bold");

  // 34. Position
  const position = props["position"] as string | undefined;
  if (position === "relative") classes.push("sf-relative");
  else if (position === "absolute") classes.push("sf-absolute");
  else if (position === "fixed") classes.push("sf-fixed");
  else if (position === "sticky") classes.push("sf-sticky");

  // 35. Z-index
  const zIndex = props["zIndex"] as string | number | undefined;
  if (zIndex === 10 || zIndex === "10") classes.push("sf-z-10");
  else if (zIndex === 20 || zIndex === "20") classes.push("sf-z-20");
  else if (zIndex === 30 || zIndex === "30") classes.push("sf-z-30");
  else if (zIndex === 40 || zIndex === "40") classes.push("sf-z-40");
  else if (zIndex === 50 || zIndex === "50") classes.push("sf-z-50");

  return classes;
}
