using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToHellAndBack.Chapters;

namespace ToHellAndBack.Dungeon.Cells
{
    public class EmptyRoom : BaseRoom
    {
        public override string RoomName => "Пустышка";

        public override void ChapterStepToTheRoom(Hero hero, Action extraAction = null)
        {
            //Yep, empty room. Nothing happens
        }
    }
}
