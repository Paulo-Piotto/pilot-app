import { ExpanderContainer, UnactiveMotionTitle } from "./styles"
import { motion } from "framer-motion"

export default function Expander({ animationData, thisId, children, handleExpanderSelection, backgroundColor, title }) {
    const animationTransition = {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
    }
    
    const variants = {
        active: {
            width: animationData.containerSize.width - 40,
            transition: {
                ...animationTransition,
                when: "afterChildren"
            }
        },
        unactive: { 
            width: 40,
            transition: {
                ...animationTransition,
                when: "beforeChildren"
            }
        },
    }

    const contentVariants = {
        unactive: { scale: 0, opacity: 0 },
        active: { scale: 1, opacity: 1 }
    }

    const verticalTitleVariants = {
        active: { y: 0 },
        unactive: { y: -400 }
    }

    return (
        <ExpanderContainer
            layout
            backgroundColor={backgroundColor}
            variants={variants}
            initial={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            animate={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            onClick={() => { handleExpanderSelection(thisId) }}
        >
            <UnactiveMotionTitle
                variants={verticalTitleVariants}
                initial="unactive"
                animate={animationData.currentSelectedId === thisId ? "unactive" : "active"}
                transition={animationTransition}
            >
                {title.toUpperCase()}
            </UnactiveMotionTitle>
            <motion.div
                variants={contentVariants}
                initial="unactive"
                animate={ animationData.currentSelectedId === thisId ? "active" : "unactive" }
            >
                <h1>{title}</h1>
                {children}
            </motion.div>
        </ExpanderContainer>
    )
}