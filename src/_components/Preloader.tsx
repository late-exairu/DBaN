export default function Preloader(props: { className?: string }) {
  const { className } = props;

  return (
    <svg
      className={`${className} mx-auto h-20 w-20`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle cx={84} cy={50} r={10}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="0.25s"
          keySplines="0 0.5 0.5 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="10;0"
        />
        <animate
          attributeName="fill"
          begin="0s"
          calcMode="discrete"
          dur="1s"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="#000000;#000000;#000000;#000000;#000000"
        />
      </circle>
      <circle cx={16} cy={50} r={10}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="0s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx={50} cy={50} r={10}>
        <animate
          attributeName="r"
          begin="-0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-0.25s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx={84} cy={50} r={10}>
        <animate
          attributeName="r"
          begin="-0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-0.5s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
      <circle cx={16} cy={50} r={10}>
        <animate
          attributeName="r"
          begin="-0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        />
        <animate
          attributeName="cx"
          begin="-0.75s"
          calcMode="spline"
          dur="1s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        />
      </circle>
    </svg>
  );
}
