using System;
using ToHellAndBack.Chapters;
using ToHellAndBack.UI;

namespace ToHellAndBack
{
    class Program
    {
        static void Main(string[] args)
        {
            var helper = new ConsoleHelper();

            helper.HeroSad("Бог услышь меня! Я вверяю свою жизнь в твои руки");
            helper.HeroSad("Спускаясь в это бесконечное подземелье");
            helper.HeroSad("Я клянусь принимать любые судьбоносные решения используя гадальные кости");

            helper.WaitGamer();

            var hero = new Hero() { Name = "Конан", Stamina = 100 };
            var game = new Game(hero, helper);

            var lvl = 1;
            do
            {
                game.GoToLevel(lvl);
                lvl++;
            } while (helper.IsGamerAgree());


            helper.HeroSad("Спасибо, я жив лишь благодаря тебе");
        }
    }
}
