import React from "react";

export function Table({ children, className,...rest }) { return <table  className={ className } {...rest}>{ children }</table> }
export function Thead({ children, className }) { return <thead className={ className }>{ children }</thead> }
export function Tbody({ children, className }) { return <tbody className={ className }>{ children }</tbody> }
export function Th({ children, className , ...rest}) { return <th className={ className }{ ...rest}>{ children }</th> }
export function Tr({ children, className, ...rest }) { return <tr className={ className }{ ...rest}>{ children }</tr> }
export function Td({ children, className , ...rest}) { return <td className={ className } {...rest}>{ children }</td> }