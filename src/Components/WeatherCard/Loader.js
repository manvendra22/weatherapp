import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={640}
        backgroundColor="var(--color-backgroundColor)"
        foregroundColor="var(--color-foregroundColor)"
    >
        <rect x="0" y="10" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="30" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="50" rx="5" ry="5" width="175" height="10" />
        <rect x="0" y="90" rx="5" ry="5" width="100%" height="180" />
        <rect x="0" y="310" rx="5" ry="5" width="100%" height="60" />
        <rect x="0" y="410" rx="5" ry="5" width="100%" height="210" />
    </ContentLoader>
)

export default Loader