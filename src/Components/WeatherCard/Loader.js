import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={675}
        backgroundColor="var(--color-backgroundColor)"
        foregroundColor="var(--color-foregroundColor)"
    >
        <rect x="0" y="10" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="30" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="50" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="90" rx="5" ry="5" width="100%" height="180" />
        <rect x="0" y="300" rx="5" ry="5" width="100%" height="100" />
        <rect x="0" y="430" rx="5" ry="5" width="100%" height="220" />
    </ContentLoader>
)

export default Loader