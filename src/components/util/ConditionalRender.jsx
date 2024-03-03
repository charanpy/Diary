const ConditionalRender = ({ children, canRender }) => {
  return !!canRender ? children : "";
};

export default ConditionalRender;
