import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItem = () => {
  return (
    <section>
      <h2 className="section-title">
        <Skeleton duration={1} height={60} />
      </h2>
      <h2 className="section-title mt-4">
        <Skeleton duration={1} height={420} />
      </h2>

      <h2 className="section-title mt-4">
        <Skeleton duration={1} height={220} />
      </h2>
      {/* <ul className="list">
          {Array(17)
            .fill()
            .map((item, index) => (
              <li className="card" key={index}>
                <Skeleton height={180} />
              </li>
            ))}
        </ul> */}
    </section>
  );
};

export const Homeskeleton = () => {
  return (
    <>
      <SkeletonItem />
    </>
  )
}
