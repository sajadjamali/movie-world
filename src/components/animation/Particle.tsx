"use client"
import React from 'react';
import { particlesConfig } from "@/config/particles.config";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim"
import Particles from "react-particles";

const Particle: React.FC = () => {

    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
    }, []);

    return (
        <Particles
            id="tsparticels"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig as any}
        />
    );
}

export default Particle;