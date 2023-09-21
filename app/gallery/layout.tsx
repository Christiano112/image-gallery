"use client";

import React from "react";
// import { DndContext } from '@dnd-kit/core';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            {/* <DndContext> */}
                {children}
            {/* </DndContext> */}
        </React.Fragment>
    );
};

export default Layout;