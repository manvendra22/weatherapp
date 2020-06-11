import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={110}
    >
        <rect x="10" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="110" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="210" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="310" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="410" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="510" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="610" y="0" rx="5" ry="5" width="70" height="110" />
    </ContentLoader>
)

export default Loader