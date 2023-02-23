import { ExpanderContainer } from "./styles"
import { motion } from "framer-motion"

export default function Expander({ animationData, thisId, children, handleExpanderSelection, backgroundColor, title }) {
    const variants = {
        active: { width: animationData.containerSize.width - 40 },
        unactive: { width: 40 },
    }

    const contentVariants = {
        unactive: { scale: 0, opacity: 0 },
        active: { scale: 1, opacity: 1 }
    }

    const animationTransition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 100
    }

    return (
        <ExpanderContainer
            layout
            backgroundColor={backgroundColor}
            variants={variants}
            initial={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            animate={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            transition={animationTransition}
            onClick={() => { handleExpanderSelection(thisId) }}
        >
            <motion.div
                variants={contentVariants}
                initial="unactive"
                animate={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
                transition={animationTransition}
            >
                <h1>{title}</h1>
                {children}
            </motion.div>
        </ExpanderContainer>
    )
}