import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={110}
        backgroundColor="var(--color-backgroundColor)"
        foregroundColor="var(--color-foregroundColor)"
    >
        <rect x="20" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="120" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="220" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="320" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="420" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="520" y="0" rx="5" ry="5" width="70" height="110" />
        <rect x="620" y="0" rx="5" ry="5" width="70" height="110" />
    </ContentLoader>
)

export default Loader