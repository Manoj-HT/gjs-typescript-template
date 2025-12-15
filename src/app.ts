#!/usr/bin/env -S gjs -m

import system from 'system';
import { Application } from './init.js';

const app = new Application();
app.run([system.programInvocationName, ...system.programArgs]);
