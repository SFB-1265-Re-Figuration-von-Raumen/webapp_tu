import React from 'react'

const AddIconButton = (props) => (
    <svg
        data-name="Ebene 1"
        xmlns="http://www.w3.org/2000/svg"
        // width={68.67}
        width={100}
        // height={69.52}
        // height={100}
        {...props}
    >
        <defs>
            <clipPath id="ux-icon_custom-icon_svg__a">
                <path
                    style={{
                        fill: "none",
                    }}
                    d="M10.2 8.77h48.19v49.75H10.2z"
                />
            </clipPath>
            <clipPath id="ux-icon_custom-icon_svg__b">
                <path
                    style={{
                        fill: "none",
                    }}
                    d="M10.2 8.77h48.19v49.75H10.2z"
                />
            </clipPath>
        </defs>
        <g
            style={{
                clipPath: "url(#ux-icon_custom-icon_svg__a)",
            }}
        >
            <path
                d="M12.63 19.5c-1.09.88-1.98 3.22-1.98 5.22V50.2c0 4.35 3.53 7.88 7.88 7.88h25.48c1.56 0 3.02-.45 
4.24-1.24.61-.39 1.16-.86 1.63-1.39"
                style={{
                    fill: "none",
                }}
            />
            <path
                d="M12.63 19.5c-1.09.88-1.98 3.22-1.98 5.22V50.2c0 4.35 3.53 7.88 7.88 7.88h25.48c1.56 0 3.02-.45 
4.24-1.24.61-.39 1.16-.86 1.63-1.39"
                style={{
                    fill: "none",
                    stroke: "#7dd1a4",
                    strokeWidth: ".9px",
                }}
            />
        </g>
        <path
            style={{
                fill: "none",
                stroke: "#000",
                strokeWidth: ".9px",
            }}
            d="M37.69 17.37v25.27M50.33 30H25.05"
        />
        <g
            style={{
                clipPath: "url(#ux-icon_custom-icon_svg__b)",
            }}
        >
            <rect
                x={16.69}
                y={9.23}
                width={41.24}
                height={41.24}
                rx={7.88}
                ry={7.88}
                style={{
                    fill: "none",
                    stroke: "#7dd1a4",
                    strokeWidth: ".9px",
                }}
            />
        </g>
    </svg>
);

export default AddIconButton;