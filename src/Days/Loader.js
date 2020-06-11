import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={110}
    >
        <rect x="10" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="105" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="200" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="295" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="390" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="485" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="580" y="0" rx="5" ry="5" width="75" height="110" />
    </ContentLoader>
)

export default Loader