using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ToHellAndBack.Chapters;
using ToHellAndBack.Dungeon;
using ToHellAndBack.Dungeon.Cells;
using ToHellAndBack.UI;

namespace ToHellAndBack
{
    public class Game
    {
        private Random _random = new Random();
        public ConsoleHelper ConsoleHelper { get; set; }
        public Hero CurrentHero { get; set; }
        public List<DungeonLevel> Levels { get; set; } = new List<DungeonLevel>();

        private DungeonLevel CurrentLevel = null;

        public Game(Hero hero, ConsoleHelper consoleHelper)
        {
            CurrentHero = hero;
            ConsoleHelper = consoleHelper;
            ConsoleHelper.UpdateHeroStats(CurrentHero, 0);
        }

        public void GoToLevel(int level)
        {
            SwitchToLevel(level);
            ConsoleHelper.NarratorSad($"Герой спустился на уровень {level}");

            while(CurrentLevel.Rooms.Any())
            {
                ConsoleHelper.NarratorSad($"Герой изучил комнату");
                CurrentHero.Stamina--;
                var cell = CurrentLevel.Rooms.Pop();
                cell.ChapterStepToTheRoom(CurrentHero);
            }

            ConsoleHelper.HeroSad($"Ну вот я и закончил зачищать этот уровень");
            ConsoleHelper.HeroSad($"Стоит ли мне двигаться дальше?");
        }

        private void SwitchToLevel(int level)
        {
            if (Levels.Count > level)
            {
                CurrentLevel = Levels[level];
                return;
            }

            //There is no level which we need it. Call builder to create it

            var newLevel = BuildLevel(level);
            CurrentLevel = newLevel;
            Levels.Add(newLevel);
        }

        private DungeonLevel BuildLevel(int level)
        {
            var dungeonLevel = new DungeonLevel();
            dungeonLevel.LevelNumber = level;

            var rooms = new List<BaseRoom>();
            var staminaCount = Math.Round(0.8 * MathF.Pow(level + 3, 2));
            var coinsCount = (int)Math.Round(5 * MathF.Pow(1.5f, level));

            do
            {
                staminaCount--;

                var treasureCoinsCount = _random.Next(1, coinsCount);
                coinsCount -= treasureCoinsCount;

                var treasureRoom = new TreasureRoom(treasureCoinsCount);
                rooms.Add(treasureRoom);
            } while (coinsCount > 0);

            while(staminaCount > 0)
            {
                staminaCount--;

                var emptyRoom = new EmptyRoom();
                rooms.Add(emptyRoom);
            }

            dungeonLevel.Rooms = new Stack<BaseRoom>(rooms);

            return dungeonLevel;
        }

        private void SpendStamin(int staminaSpend = 1)
        {
            CurrentHero.Stamina -= staminaSpend;
            ConsoleHelper.NarratorSad($"Герой устаёт. -{staminaSpend} выносливости");
            ConsoleHelper.UpdateHeroStats(CurrentHero, CurrentLevel.LevelNumber);
        }

        public void GetCoin(int coinCount = 1)
        {
            CurrentHero.Coins += coinCount;
            ConsoleHelper.NarratorSad($"Герой нашёл монетку {coinCount}");
            if (CurrentHero.Coins % 2 == 0)
            {
                ConsoleHelper.HeroSad($"Спасибо господи. Я насобирал уже {CurrentHero.Coins} монет");
            }
            ConsoleHelper.UpdateHeroStats(CurrentHero, CurrentLevel.LevelNumber);
        }
    }
}
