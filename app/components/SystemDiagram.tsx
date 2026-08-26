"use client";

import { motion } from "motion/react";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  /** Path from this node's inner edge to the dispatch core. */
  edge: string;
  /** Data leaves the core rather than arriving at it. */
  outbound?: boolean;
};

const NODE_W = 190;
const NODE_H = 76;

const nodes: Node[] = [
  {
    id: "rider",
    x: 30,
    y: 72,
    label: "Rider App",
    sub: "Booking, fares, receipts",
    edge: "M 220 110 C 290 110, 320 170, 320 226",
  },
  {
    id: "driver",
    x: 30,
    y: 372,
    label: "Driver App",
    sub: "Trips, charge, payouts",
    edge: "M 220 410 C 290 410, 320 350, 320 294",
  },
  {
    id: "charging",
    x: 660,
    y: 72,
    label: "Charging Network",
    sub: "Live station availability",
    edge: "M 660 110 C 590 110, 560 170, 560 226",
    outbound: true,
  },
  {
    id: "ledger",
    x: 660,
    y: 372,
    label: "Impact Ledger",
    sub: "CO₂ recorded per trip",
    edge: "M 660 410 C 590 410, 560 350, 560 294",
    outbound: true,
  },
];

const DRAW = { duration: 1.1, ease: [0.22, 1, 0.36, 1] } as const;

export default function SystemDiagram() {
  return (
    <section className="w-full bg-[#0F0A24]">
      <div className="mx-auto w-full max-w-360 px-4 py-24 md:py-32 lg:px-6">
        <div className="max-w-3xl">
          <span className="font-display text-xs uppercase tracking-[0.36em] text-lilac">
            The system
          </span>
          <h2 className="mt-6 font-display font-normal text-[36px] leading-[1.05] text-white sm:text-[48px] lg:text-[60px]">
            One engine,
            <br />
            <span className="italic text-[#A78BFA]">four conversations</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Riders, drivers, chargers and the emissions record all talk to the
            same dispatch core. Because charge state is a first-class input
            rather than an afterthought, the fleet can stay fully electric
            without stranding anyone.
          </p>
        </div>

        <div className="mt-16 overflow-x-auto md:mt-20">
          <motion.svg
            viewBox="0 0 880 520"
            className="h-auto w-full min-w-190"
            role="img"
            aria-label="Rider app and driver app send requests to the Hyerr dispatch engine, which in turn queries the charging network and writes to the impact ledger."
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* ---------- Edges ---------- */}
            {nodes.map((node, i) => (
              <g key={`edge-${node.id}`}>
                <path
                  d={node.edge}
                  fill="none"
                  stroke="#745CAB"
                  strokeOpacity={0.22}
                  strokeWidth={1.5}
                />
                <motion.path
                  d={node.edge}
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 0.85,
                      transition: { ...DRAW, delay: 0.35 + i * 0.12 },
                    },
                  }}
                />
                {/* Traffic travelling the link */}
                <motion.circle
                  r={3.5}
                  fill="#DDD6FE"
                  style={{ offsetPath: `path('${node.edge}')`, offsetRotate: "0deg" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      offsetDistance: node.outbound ? ["100%", "0%"] : ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                      transition: {
                        duration: 2.6,
                        delay: 1.4 + i * 0.45,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: "linear",
                      },
                    },
                  }}
                />
              </g>
            ))}

            {/* ---------- Satellite nodes ---------- */}
            {nodes.map((node, i) => {
              const cx = node.x + NODE_W / 2;
              return (
                <motion.g
                  key={node.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.1 + i * 0.1 },
                    },
                  }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={18}
                    fill="#FFFFFF"
                    fillOpacity={0.04}
                    stroke="#745CAB"
                    strokeOpacity={0.4}
                  />
                  <text
                    x={cx}
                    y={node.y + 33}
                    textAnchor="middle"
                    className="font-display"
                    fontSize={19}
                    fill="#F4F4F5"
                  >
                    {node.label}
                  </text>
                  <text
                    x={cx}
                    y={node.y + 54}
                    textAnchor="middle"
                    fontSize={11.5}
                    fill="#F4F4F5"
                    fillOpacity={0.5}
                  >
                    {node.sub}
                  </text>
                </motion.g>
              );
            })}

            {/* ---------- Dispatch core ---------- */}
            <motion.g
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              style={{ transformOrigin: "440px 260px" }}
            >
              <motion.rect
                x={306}
                y={190}
                width={268}
                height={140}
                rx={32}
                fill="none"
                stroke="#A78BFA"
                strokeOpacity={0.25}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: [0.15, 0.55, 0.15],
                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  },
                }}
              />
              <rect x={320} y={204} width={240} height={112} rx={24} fill="#39206C" />
              <text
                x={440}
                y={250}
                textAnchor="middle"
                className="font-display"
                fontSize={26}
                fill="#FFFFFF"
              >
                Hyerr Dispatch
              </text>
              <text
                x={440}
                y={278}
                textAnchor="middle"
                fontSize={12}
                fill="#FFFFFF"
                fillOpacity={0.65}
              >
                Battery-aware matching
              </text>
            </motion.g>
          </motion.svg>
        </div>

        <p className="mt-6 font-display text-xs uppercase tracking-[0.3em] text-lilac md:hidden">
          Scroll the diagram sideways
        </p>
      </div>
    </section>
  );
}
