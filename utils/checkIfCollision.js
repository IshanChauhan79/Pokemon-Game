export const checkIfCollision = ({ block1, block2 }) => {
  const collisionFromLeft =
    block1.position.x + block1.width >= block2.position.x;
  const collisionFromRight =
    block1.position.x <= block2.position.x + block2.width;
  const collisionFromUp =
    block1.position.y + block1.height >= block2.position.y;
  const CollisionFromDown =
    block1.position.y <= block2.position.y + block2.height;
  return (
    collisionFromLeft &&
    collisionFromRight &&
    collisionFromUp &&
    CollisionFromDown
  );
};
