using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToHellAndBack.Dungeon.Cells;

namespace ToHellAndBack.Dungeon
{
    public class DungeonLevel
    {
        /// <summary>
        /// How deep is level.
        /// Start from 1
        /// </summary>
        public int LevelNumber { get; set; } = 1;

        public Stack<BaseRoom> Rooms { get; set; }
    }
}
