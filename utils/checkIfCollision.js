export const checkIfCollision = ({ block1, block2, bufferSpace = {} }) => {
  const {
    leftBuffer = 0,
    rightBuffer = 0,
    topBuffer = 0,
    bottomBuffer = 0,
  } = bufferSpace || {};
  const collisionFromLeft =
    block1.position.x + block1.width >= block2.position.x + leftBuffer;
  const collisionFromRight =
    block1.position.x + rightBuffer <= block2.position.x + block2.width;
  const collisionFromDown =
    block1.position.y + block1.height >= block2.position.y + bottomBuffer;
  const collisionFromTop =
    block1.position.y + topBuffer <= block2.position.y + block2.height;
  return (
    collisionFromLeft &&
    collisionFromRight &&
    collisionFromTop &&
    collisionFromDown
  );
};
