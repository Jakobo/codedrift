import React, { forwardRef } from "react";

const VIEWBOX = {
  ICON: [104, 127],
  WORDMARK: [469, 127],
};

const UNITS = /[^\d]+/;

const Logo = forwardRef(
  (
    {
      left = "currentColor",
      right = "currentColor",
      text = [],
      style = {},
      ...rest
    },
    ref
  ) => {
    const styles = { ...style };

    // scale the viewbox if only one dimension supplied
    const ratio =
      text.length === 0 || text === false ? VIEWBOX.ICON : VIEWBOX.WORDMARK;
    if (styles.width && !styles.height) {
      const unit = `${styles.width}`.match(UNITS)?.[0] || "px";
      styles.height = `${Math.ceil(
        (ratio[1] * parseInt(styles.width, 10)) / ratio[0]
      )}${unit}`;
    } else if (styles.height && !styles.width) {
      const unit = `${styles.height}`.match(UNITS)?.[0] || "px";
      styles.width = `${Math.ceil(
        (ratio[0] * parseInt(styles.height, 10)) / ratio[1]
      )}${unit}`;
    }

    console.log(left);

    return (
      <div ref={ref} {...rest} style={styles}>
        {text.length === 0 || text === false ? (
          <IconOnly
            width={parseInt(styles.width, 10)}
            height={parseInt(styles.height, 10)}
            left={left}
            right={right}
          />
        ) : (
          <FullLogo
            width={parseInt(styles.width, 10)}
            height={parseInt(styles.height, 10)}
            left={left}
            right={right}
            text={text}
          />
        )}
      </div>
    );
  }
);
Logo.displayName = "Logo";
export default Logo;

const CD = ({ left, right }) => (
  <g className="cd" data-name="cd">
    <polygon
      className={`fill-current ${left}`}
      points="48.5 22.27 48.5 0 0 52.39 48.5 104.78 48.5 82.52 20.61 52.39 48.5 22.27"
    />
    <polygon
      className={`fill-current ${right}`}
      points="55.91 44.48 55.91 22.21 104.41 74.6 55.91 126.99 55.91 104.72 83.8 74.6 55.91 44.48"
    />
  </g>
);

const Code = ({ text }) => (
  <g className="code" data-name="code">
    <path
      className={`fill-current ${text}`}
      d="M157.71,85.77v5.37q0,14.22-13.41,14.22h-7.23q-13.41,0-13.41-14.22V35.86q0-14.23,13.41-14.23h7.23q13.41,0,13.41,14.23V45.3H146.52V36.67c0-3.26-1.67-4.9-5-4.9h-2.21c-3,0-4.43,1.64-4.43,4.9V90.32c0,3.27,1.47,4.9,4.43,4.9h2.8q4.42,0,4.43-4.9V85.77Z"
    />
    <path
      className={`fill-current ${text}`}
      d="M179.41,105.36q-13.53,0-13.53-14.22V36q0-14.34,13.41-14.34H190q13.41,0,13.41,14.34V91.14q0,14.22-13.53,14.22Zm2.68-10.14h5.71q4.44,0,4.44-4.9V36.67c0-3.26-1.68-4.9-5-4.9H182c-3.26,0-4.9,1.64-4.9,4.9V90.32C177.07,93.59,178.75,95.22,182.09,95.22Z"
    />
    <path
      className={`fill-current ${text}`}
      d="M213.34,105.36V21.63h19.48q15.75,0,15.74,16.09V93.24q0,12.12-13.41,12.12Zm11.2-10.14h8.4c2.95,0,4.43-1.25,4.43-3.73V37.84c0-4-1.67-6.07-5-6.07h-7.81Z"
    />
    <polygon
      className={`fill-current ${text}`}
      points="258.48 105.36 258.48 21.63 286.24 21.63 286.24 31.77 269.68 31.77 269.68 57.2 284.37 57.2 284.37 67.34 269.68 67.34 269.68 95.22 286.24 95.22 286.24 105.36 258.48 105.36"
    />
  </g>
);

const Drift = ({ text }) => (
  <g className="drift" data-name="drift">
    <path
      className={`fill-current ${text}`}
      d="M294.28,105.36V21.63h19.48q15.74,0,15.74,16.09V93.24q0,12.12-13.41,12.12Zm11.2-10.14h8.4c2.95,0,4.43-1.25,4.43-3.73V37.84c0-4-1.67-6.07-5-6.07h-7.81Z"
    />
    <path
      className={`fill-current ${text}`}
      d="M339.42,21.63h21.92q12.82,0,12.83,14.34V56.61q0,11-6.65,13.88l7.82,34.87H364.72l-7.34-33.82h-6.77v33.82H339.42V21.63ZM350.61,62H358q5,0,5-6.06V37.84c0-4-1.67-6.07-5-6.07h-7.35Z"
    />
    <rect
      className={`fill-current ${text}`}
      x="383.5"
      y="21.63"
      width="11.2"
      height="83.74"
    />
    <polygon
      className={`fill-current ${text}`}
      points="431.08 57.2 431.08 67.34 416.39 67.34 416.39 105.36 405.19 105.36 405.19 21.63 432.95 21.63 432.95 31.77 416.39 31.77 416.39 57.2 431.08 57.2"
    />
    <polygon
      className={`fill-current ${text}`}
      points="458.37 31.77 458.37 105.36 447.18 105.36 447.18 31.77 436.45 31.77 436.45 21.63 469.1 21.63 469.1 31.77 458.37 31.77"
    />
  </g>
);

const IconOnly = ({ left, right, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${VIEWBOX.ICON[0]} ${VIEWBOX.ICON[1]}`}
    {...props}
  >
    <g className="logo" data-name="logo">
      <CD left={left} right={right} />
    </g>
  </svg>
);
IconOnly.displayName = "Logo(Icon-Only)";

const FullLogo = ({ left, right, text, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${VIEWBOX.WORDMARK[0]} ${VIEWBOX.WORDMARK[1]}`}
    {...props}
  >
    <g className="logo" data-name="logo">
      <CD left={left} right={right} />
      <Code text={text[0]} />
      <Drift text={text[1]} />
    </g>
  </svg>
);
FullLogo.displayName = "Logo(Full-Logo)";
