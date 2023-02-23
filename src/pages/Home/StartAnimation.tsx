import { styled } from "@mui/material";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const FullScreenContainer = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))

const LogoContainer = styled(motion.div)(() => ({
  position: 'relative',
  width: '150px',
  height: '150px',
}));

const LogoPart = styled(motion.div)(() => ({
  position: 'absolute',
  backgroundColor: '#00C2FF',
}));

const Circle = styled(LogoPart)(() => ({
  width: '33px',
  height: '33px',
  borderRadius: '50%',
}));

const BottomCircle = styled(Circle)(() => ({
  bottom: 7,
  left: 17,
}));

const MidCircle = styled(Circle)(() => ({
  bottom: 50,
  left: 61,
}));

const TopCircle = styled(Circle)(() => ({
  top: 23,
  left: 17,
}));

const DiagonalGitBar = styled(LogoPart)(() => ({
  height: 90,
  width: 13,
  top: 0,
  left: 30,
  transform: 'rotate(-45deg)',
}));

const VerticalGitBar = styled(LogoPart)(() => ({
  top: 53,
  left: 27,
  height: 60,
  width: 13,
  transform: 'rotate(180deg)',
}));

const ReportBar = styled(LogoPart)(() => ({
  top: 30,
  right: 3,
  height: 14,
  borderRadius: 6,
}));

function StartAnimation() {
  return (
    <>
      <FullScreenContainer>
        <LogoContainer
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: .2, delay: 1.5, ease: 'easeIn' }}
          onAnimationComplete={() => {
            document.body.style.overflowY = 'auto';
          }}
        >
          <BottomCircle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: .25, type: 'spring', stiffness: 150, delay: 0.4 }}
          />
          <MidCircle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: .25, type: 'spring', stiffness: 175, delay: .5 }}
          />
          <TopCircle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: .25, type: 'spring', stiffness: 200, delay: .6 }}
          />
          <DiagonalGitBar
            initial={{ height: 0, rotate: -45, translateY: 45 }}
            animate={{ height: 90, rotate: -45, translateY: 0 }}
            transition={{ duration: .5, type: 'spring', delay: .9 }}
          />
          <VerticalGitBar
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: .5, type: 'spring', delay: .9 }}
          />
          <ReportBar
            initial={{ top: 30, width: 0 }}
            animate={{ width: 70 }}
            transition={{ duration: .5, type: 'spring', delay: 1.1 }}
          />
          <ReportBar
            initial={{ top: 60, width: 0 }}
            animate={{ width: 41 }}
            transition={{ duration: .5, type: 'spring', delay: 1.15 }}
          />
          <ReportBar
            initial={{ top: 90, width: 0 }}
            animate={{ width: 41 }}
            transition={{ duration: .5, type: 'spring', delay: 1.2 }}
          />
          <ReportBar
            initial={{ top: 120, width: 0 }}
            animate={{ width: 70 }}
            transition={{ duration: .5, type: 'spring', delay: 1.25 }}
          />
        </LogoContainer>
      </FullScreenContainer>
      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{ opacity: 1, pointerEvents: 'initial' }}
        transition={{ duration: .2, delay: 1.7, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </>
  );
}

export default StartAnimation;
