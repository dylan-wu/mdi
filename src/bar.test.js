const rewire = require("rewire");
const bar = rewire("./bar.js");
const body = bar.__get__('body')

no_title = `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="124" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>

            <rect rx="4" x="0" width="124" height="20" fill="#428bca"/>
            <rect rx="4" x="64" width="60" height="20" fill="#555" />
            <rect rx="4" x="64" width="60" height="20" fill="#f0ad4e" />
                <path fill="#f0ad4e" d="M64 0h4v20h-4z" />
            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="0" y="15" fill="#010101" fill-opacity=".3">
                100%
                </text>
                <text x="0" y="14">
                100%
                </text>
            </g>
        </svg>`

test('bar 100%', () => {
    expect(body(100, 100)).toMatch(no_title)
  });


has_title = `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="124" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>

            <rect rx="4" x="0" width="124" height="20" fill="#428bca"/>
            <rect rx="4" x="64" width="60" height="20" fill="#555" />
            <rect rx="4" x="64" width="24" height="20" fill="#f0ad4e" />
                <path fill=\"#f0ad4e\" d=\"M64 0h4v20h-4z\" /><rect rx=\"4\" width=\"124\" height=\"20\" fill=\"url(#a)\" />
        <g fill=\"#fff\" text-anchor=\"left\" font-family=\"DejaVu Sans,Verdana,Geneva,sans-serif\" font-size=\"11\">
        <text x=\"4\" y=\"15\" fill=\"#010101\" fill-opacity=\".3\">
            4/10
        </text>
        <text x=\"4\" y=\"14\">
            4/10
        </text>
        </g>
            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="94" y="15" fill="#010101" fill-opacity=".3">
                40%
                </text>
                <text x="94" y="14">
                40%
                </text>
            </g>
        </svg>`

test('bar 100%', () => {
expect(body(40, 100, {title:"4/10"})).toEqual(has_title)
});  