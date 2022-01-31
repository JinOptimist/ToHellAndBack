using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ToHellAndBack.Chapters;

namespace ToHellAndBack.UI
{
    public class ConsoleHelper
    {
        private List<ConsoleMessage> _lastMessages = new List<ConsoleMessage>();
        private const int LeftMarginLastMessages = 3;
        private const int TopMarginLastMessages = 4;
        private const int MessageCount = 10;
        private const int MaxMessageLength = 100;
        

        private const int StaminPlaceholderSize = 5;

        public ConsoleHelper()
        {
            Console.OutputEncoding = new UTF8Encoding();
        }

        public void WaitGamer()
        {
            NarratorSad("Продолжим как будете готовы");
            Console.ReadKey();
        }

        public bool IsGamerAgree()
        {
            string answer;
            do
            {
                var question = "[Y]es. [N]o";
                NarratorSad(question);
                Console.SetCursorPosition(LeftMarginLastMessages + question.Length + 1, TopMarginLastMessages + 0);
                answer = Console.ReadLine();
                answer = answer.ToUpper();
            } while (answer != "Y" && answer != "N");

            return answer == "Y";
        }

        public void UpdateHeroStats(Hero hero, int level)
        {
            Console.SetCursorPosition(LeftMarginLastMessages, 1);
            var staminText = hero.Stamina.ToString();
            staminText += new string(' ', StaminPlaceholderSize - staminText.Length);
            Console.Write($"Имя:");
            TextColored($"{hero.Name}", ConsoleColor.DarkBlue);
            Console.Write($"\tВыносливость:");
            TextColored($"{staminText}", ConsoleColor.Blue);
            Console.Write($"\tМонетки:");
            TextColored($"{hero.Coins}", ConsoleColor.Yellow);
            
            Console.SetCursorPosition(LeftMarginLastMessages, 2);
            Console.Write($"Текущий уровень подземелья:{level}");
        }

        public void HeroSad(string heroesPhrase)
        {
            PhraseColored(heroesPhrase, ConsoleColor.Green);
        }

        public void NarratorSad(string narratorPhrase)
        {
            PhraseColored(narratorPhrase, ConsoleColor.Gray);
        }

        private void PhraseColored(string phrase, ConsoleColor color)
        {
            var newMessage = new ConsoleMessage { Message = phrase, Color = color };
            _lastMessages.Add(newMessage);
            for (int i = _lastMessages.Count - 1; i > 0 && _lastMessages.Count > 1; i--)
            {
                _lastMessages[i] = _lastMessages[i - 1];
            }
            _lastMessages[0] = newMessage;

            while (_lastMessages.Count > MessageCount)
            {
                _lastMessages.RemoveAt(MessageCount);
            }

            for (int i = 0; i < _lastMessages.Count; i++)
            {
                var message = _lastMessages[i];
                Console.SetCursorPosition(LeftMarginLastMessages, TopMarginLastMessages + i);
                TextColored(message.Message, message.Color, 150);//Console.LargestWindowWidth
            }

            Thread.Sleep(200);
        }

        private void TextColored(string message, ConsoleColor color, int maxSize = 5)
        {
            var backupColor = Console.ForegroundColor;
            Console.ForegroundColor = color;
            if (message.Length > MaxMessageLength)
            {
                message = message.Substring(0, MaxMessageLength);
            }
            var spaces = new string(' ', maxSize - message.Length);
            Console.Write(message + spaces);
            Console.ForegroundColor = backupColor;
        }

        private class ConsoleMessage
        {
            public string Message { get; set; }
            public ConsoleColor Color { get; set; }
        }
    }
}
