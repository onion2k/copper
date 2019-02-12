import React, { useState, useEffect } from "react";

interface iConnector {
  key: string;
}

export function Connector({ key }: iConnector) {
  return <div className="node" />;
}
