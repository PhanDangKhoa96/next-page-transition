import {Link} from "next-transition-router";
import React from "react";

export default function SimpleLayerPage() {
    return (
        <div>
            SimpleLayerPage <Link href={"/"}>To oage</Link>
            <div className="pt-20">
                <div className="">
                    <h1 className="page-title font-grotesk overflow-hidden  text-[5vw] uppercase leading-[0.6]">
                        Hello world
                    </h1>
                </div>
            </div>
        </div>
    );
}
