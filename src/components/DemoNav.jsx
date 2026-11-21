import React from 'react';
import {NavLink} from 'react-router-dom';
export default function DemoNav(){return <nav className="demo-fork-nav" aria-label="Demonstration scenarios"><NavLink to="/demos" end>All scenarios</NavLink><NavLink to="/guided-demo">Facility cutaway</NavLink><NavLink to="/demos/military">Military sustainment</NavLink><NavLink to="/demos/council">Council evidence lab</NavLink></nav>;}
