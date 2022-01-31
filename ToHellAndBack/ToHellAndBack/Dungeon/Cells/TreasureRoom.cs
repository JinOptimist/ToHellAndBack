using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToHellAndBack.Chapters;

namespace ToHellAndBack.Dungeon.Cells
{
    public class TreasureRoom : BaseRoom
    {
        public override string RoomName => "Сокровищница";

        public int CoinsCount { get; set; }

        public TreasureRoom(int coinsCount)
        {
            CoinsCount = coinsCount;
        }

        public override void ChapterStepToTheRoom(Hero hero, Action extraAction = null)
        {
            hero.Coins += CoinsCount;
        }
    }
}
