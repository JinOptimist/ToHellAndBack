﻿using System;
using ToHellAndBack.Chapters;

namespace ToHellAndBack.Dungeon.Cells
{
    public abstract class BaseRoom
    {
        public abstract void ChapterStepToTheRoom(Hero hero, Action extraAction = null);
    }
}