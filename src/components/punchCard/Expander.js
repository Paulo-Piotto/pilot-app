import { useEffect } from "react"
import { ExpanderContainer } from "./styles"
import { motion } from "framer-motion"

export default function Expander({ animationData, thisId, children, handleExpanderSelection }) {
    const variants = {
        active: { width: animationData.containerSize.width - 50 },
        unactive: { width: 40 },
    }

    useEffect(() => {console.log(animationData.containerSize)}, [animationData.containerSize])

    return (
        <ExpanderContainer
            layout
            variants={variants}
            initial={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            animate={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
                duration: .1
            }}
            onClick={() => {
                console.log(thisId)
                handleExpanderSelection(thisId)
            }}
        >
            <motion.div>
                {children}
            </motion.div>
        </ExpanderContainer>
    )
}