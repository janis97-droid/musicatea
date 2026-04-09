const history = [
  {
    id: "pre-610",
    title: "The Earliest Roots of Arabic Music",
    subtitle: "Early beginnings before notation and stable formal structures",
    period: "Before 610 CE",
    content: "At this stage, Arabic music was closely tied to poetry, oral tradition, travel, marketplaces, and celebration. Musical forms had not yet fully stabilized, but the first foundations of Arabic singing emerged within an environment open to Persian and Byzantine influences.",
    highlights: ["Oral poetry", "Marketplaces", "Celebration", "Persian and Byzantine influence"],
    figures: []
  },
  {
    id: "7th-century-early-islam",
    title: "The Beginnings of Islam and the Formation of the First Vocal Scene",
    subtitle: "Music continued within new religious, social, and urban contexts",
    period: "7th century CE",
    content: "With the beginnings of Islam, music did not disappear. Instead, it continued within new religious, social, and urban contexts. In Mecca and Medina, an early vocal environment began to take shape, preparing the way for the first well-known names in the history of Arabic singing.",
    highlights: ["Mecca", "Medina", "Early vocal milieu", "Social transition"],
    figures: [
      "Bilal ibn Rabah",
      "Azza al-Mayla",
      "Jamila",
      "Abu Abd al-Munim Isa ibn Abd Allah Tuways",
      "Sa'ib Khathir"
    ]
  },
  {
    id: "umayyad-era",
    title: "The Umayyad Era and the Formation of Artistic Arabic Song",
    subtitle: "The beginning of a more mature Arab vocal school",
    period: "661–750 CE",
    content: "In the Umayyad era, urban Arabic singing began to take a clearer artistic shape, with broader composition, more developed melodic craft, and improved performance practice. This stage may be seen as a true beginning for a more mature Arab vocal school, especially in the Hijaz.",
    highlights: ["Urban singing", "Hijaz", "Composition", "Performance refinement"],
    figures: [
      "Sa'id ibn Misjah",
      "Muslim ibn Muhriz",
      "Ubayd ibn Surayj",
      "Ma'bad ibn Wahb",
      "Yunus al-Katib",
      "Abd al-Malik al-Gharid"
    ]
  },
  {
    id: "abbasid-era",
    title: "The Abbasid Era and the Flourishing of Music and Theory",
    subtitle: "The consolidation of maqam, rhythm, and musical writing",
    period: "8th to 11th centuries",
    content: "In the Abbasid era, Arabic music reached a high level of development in both performance and theoretical thought. During this period, concepts such as maqam and rhythm became more firmly established, and major figures appeared who combined singing, scholarship, and writing, giving music a clear place within both culture and learning.",
    highlights: ["Maqam", "Rhythm", "Music theory", "Culture and scholarship"],
    figures: [
      {
        name: "Ibrahim al-Mawsili",
        role: "Court musician of the Abbasids and one of the pillars of early art song",
        years: "742–804",
        description: "One of the most important musicians of early Abbasid Baghdad, and a close associate of Harun al-Rashid. He is known for elevating the status of the master singer at court, and several influential musical figures later emerged from his circle."
      },
      {
        name: "Ishaq al-Mawsili",
        role: "Singer, composer, and musical theorist",
        years: "767/772–850",
        description: "The son of Ibrahim al-Mawsili, and regarded by many historians as the leading musician of his age. He combined performance, composition, and theory, and served several caliphs, making him one of the most influential figures in the music of Baghdad."
      },
      {
        name: "Ibrahim ibn al-Mahdi",
        role: "Abbasid prince and celebrated singer",
        years: "ca. 779–839",
        description: "He embodies the image of the artist-prince in the Abbasid era, combining elite political lineage with a recognized gift for singing. His presence shows the close relationship between power and musical taste in Abbasid Baghdad."
      },
      {
        name: "Ya'qub ibn Ishaq al-Kindi",
        role: "Philosopher of the Arabs and a major figure in theoretical thought",
        years: "d. ca. 870",
        description: "Not a singer or composer in the direct sense, but one of the earliest thinkers to bring scientific and philosophical reasoning into the study of sound and musical knowledge. He is closely tied to the broader translation movement into Arabic."
      },
      {
        name: "Abu Nasr al-Farabi",
        role: "Philosopher and major theorist of music",
        years: "ca. 872–950",
        description: "Known as one of the great philosophers of Islam, with much of his work written in Baghdad. His musical importance lies in turning music into a structured theoretical field rather than leaving it at the level of taste or performance alone."
      },
      {
        name: "Al-Husayn ibn Abd Allah Ibn Sina",
        role: "Philosopher, physician, and polymath",
        years: "980–1037",
        description: "Somewhat later than the Abbasid high point, but still an important continuation of the theoretical tradition. He placed music within a broader system of knowledge, treating it as part of science and rational order."
      },
      {
        name: "Abu al-Faraj al-Isfahani",
        role: "Author of Kitab al-Aghani and the great historian of Arabic song",
        years: "897–967",
        description: "He preserved much of Arabic musical memory in Kitab al-Aghani, one of the most important sources for understanding singers, poets, and musicians in the Umayyad and Abbasid periods."
      },
      {
        name: "Arib al-Ma'muniyya",
        role: "Singer, poet, and composer among the great stars of the court",
        years: "797/798–890/891",
        description: "One of the most famous qiyan in the history of Abbasid Baghdad, known for a long artistic career that extended across several reigns. Her prominence shows the major role of women in the musical life of the period."
      },
      {
        name: "Ulayya bint al-Mahdi",
        role: "Abbasid princess, poet, and musician",
        years: "777–825",
        description: "She represents a different image of the female musician at court: a princess of high rank whose poetry could be sung. Her presence shows that music was not confined to slave-singers alone, but was also embedded within the Abbasid elite."
      },
      {
        name: "Inan bint Abd Allah",
        role: "Prominent poet and qayna",
        years: "d. ca. 841",
        description: "Known for her wit and verbal brilliance, she is remembered as one of the most important poet-singers in the Arabic tradition. Her importance lies in the way she combined song, poetry, and literary exchange within Abbasid salon culture."
      },
      {
        name: "Dananir al-Barmakiyya",
        role: "Singer and poet associated with the Barmakid household",
        years: "Late 8th–early 9th century",
        description: "Her name is linked to Barmakid circles, and she was among the singers who received refined musical training. She reveals how elite political households themselves served as real incubators of sophisticated musical culture."
      }
    ]
  },
  {
    id: "andalusia",
    title: "Al-Andalus and the Andalusian Legacy",
    subtitle: "The transfer of Arabic music into more diverse traditions",
    period: "8th to 15th centuries",
    content: "Al-Andalus represented a decisive stage in the movement of Arabic music and its transformation into more varied traditions of form and performance. Ziryab stands out as the most famous figure of this era, while the Andalusian environment helped develop singing and sung poetry and left a lasting impact on the music of the Maghreb.",
    highlights: ["Ziryab", "Andalusian singing", "Sung poetry", "Maghrebi legacy"],
    figures: [
      {
        name: "Abu al-Hasan Ali ibn Nafi' Ziryab",
        role: "Andalusian musical reformer at the court of Cordoba",
        years: "9th century CE",
        description: "One of the most famous names in the history of Andalusian music. A student of Ishaq al-Mawsili, he left Baghdad for al-Andalus and became a star at the court of Cordoba. He is credited with influential changes in taste and performance, including the famous addition of a fifth string to the oud and the organization of styles of singing in al-Andalus."
      },
      {
        name: "Abu Bakr Muhammad ibn Yahya ibn al-Sa'igh Ibn Bajja",
        role: "Andalusian philosopher, physician, and poet",
        years: "ca. 1085–1139",
        description: "Ibn Bajja is more important as an early Andalusian philosopher than as a performing musician, but his value here lies in belonging to an Andalusian environment that brought together philosophy, science, and music. Sources indicate that his early formation included mathematics, astronomy, and music before he expanded into logic and natural philosophy."
      },
      {
        name: "Abu Bakr Muhammad ibn Isa ibn Abd al-Malik ibn Isa al-Zuhri al-Qurtubi Ibn Quzman",
        role: "Major Andalusian zajal poet",
        years: "d. 1160",
        description: "Ibn Quzman is the leading name associated with Andalusian zajal, the sung poetic form closest to the spoken language and to lively rhythmic expression. He is important because he represents the bridge between poetry and music in al-Andalus; his poems formed part of the sung heritage that shaped Andalusian musical taste."
      },
      {
        name: "Al-Qubri",
        role: "Early Andalusian figure associated with the beginnings of the muwashshah",
        years: "Late 9th–early 10th century",
        description: "This is an important but historically delicate figure. Sources differ in the names they use, and they also differ over who should be credited with the earliest development of the muwashshah. For that reason, al-Qubri is best presented here as a figure to whom an early role is attributed, rather than as a fixed and undisputed originator."
      }
    ]
  },
  {
    id: "ottoman-post-classical",
    title: "Regional Schools in the Ottoman and Post-Classical Era",
    subtitle: "Multiple centers and a growing modern theoretical awareness",
    period: "13th to 19th centuries",
    content: "In this phase, beginning with late Baghdad and continuing beyond it, Arabic music no longer revolved around a single center. Local schools took shape in cities such as Cairo, Aleppo, Baghdad, and Damascus. A more self-conscious theoretical and written approach also emerged, from Safi al-Din al-Urmawi in late Baghdad to Mikhail Mishaqa and Shihab al-Din in the nineteenth century.",
    highlights: ["Late Baghdad", "Cairo", "Aleppo", "Modern music theory"],
    figures: [
      {
        name: "Safi al-Din al-Urmawi",
        role: "Musical theorist and author of Kitab al-Adwar",
        years: "1216–1294",
        description: "A major figure in the history of Arabic musical theory, whose works such as Kitab al-Adwar are among the most important texts for the organization of maqam and rhythm in the post-classical period. His place here is more accurate than keeping him among the early Abbasids."
      },
      {
        name: "Mikhail Mishaqa",
        role: "Physician, intellectual, and musical theorist from Bilad al-Sham",
        years: "1800–1888",
        description: "One of the most important names associated with nineteenth-century theoretical debates on Arabic music in Damascus. His importance lies not in being a famous singer or composer, but in representing a transition toward more modern theoretical formulation, especially through his association with discussions of the equal division of the octave into twenty-four steps."
      },
      {
        name: "Muhammad Shihab al-Din",
        role: "Egyptian man of letters, poet, and writer interested in music and muwashshahat",
        years: "1795–1857",
        description: "If the intended figure here is Muhammad ibn Isma'il Shihab al-Din al-Hijazi al-Misri, he belongs to the important transition from older sung heritage to writing, explanation, and notation in the nineteenth century. His name is linked to literature and to writing on Eastern music, muwashshahat, and adwar, with works such as Safinat al-Mulk wa Nafisat al-Fulk."
      }
    ]
  },
  {
    id: "nahda-modern-beginnings",
    title: "The Arab Musical Nahda and the Beginning of the Modern Era",
    subtitle: "The bridge between older classical singing and modern Arabic music",
    period: "Late 19th century to the 1930s",
    content: "The Nahda marks the beginning of the modern Arab musical scene as we know it today. In it, the wasla, theatre, public concerts, and early recordings came together, and major figures emerged who built the bridge between older classical singing and modern Arabic music.",
    highlights: ["Wasla", "Theatre", "Early recordings", "Bridge to modernity"],
    figures: [
      {
        name: "Abdu al-Hamuli",
        role: "Major singer and innovator of the Egyptian Nahda",
        years: "1836–1901",
        description: "One of the most important voices of the nineteenth century, and—together with Muhammad Uthman—one of the two great poles of renewal in the Nahda. His name is linked to the development of urban Eastern singing in Egypt, drawing on experience from Istanbul and helping to create a bridge between older traditions and modern song."
      },
      {
        name: "Muhammad Uthman",
        role: "Composer and singer among the pioneers of the musical Nahda",
        years: "1854/1855–1900",
        description: "One of the major figures of nineteenth-century Egyptian music, especially known as a master developer of the dawr and the muwashshah. Together with al-Hamuli, he helped define the musical Nahda and left a legacy that continued to be sung across generations."
      },
      {
        name: "Yusuf al-Manyalawi",
        role: "Egyptian munshid and singer among the great voices of old tarab",
        years: "1850–1911",
        description: "Celebrated for the beauty of his voice and for his skill in performance and improvisation, he first learned from Muhammad Abd al-Rahim al-Maslub and later took singing from Muhammad Uthman. He represents the maturity of tarab performance in the late nineteenth century."
      },
      {
        name: "Salama Higazi",
        role: "Singer, composer, and stage actor",
        years: "1852–1917",
        description: "A pivotal figure because he moved song from the takht and concert setting into musical theatre. He thus became one of the clearest symbols of the transition from traditional tarab to staged musical performance, combining religious chant, singing, and acting."
      },
      {
        name: "Munira al-Mahdiyya",
        role: "Egyptian singer and actress, the 'Sultana of Tarab'",
        years: "1885–1965",
        description: "One of the most influential figures in moving Arabic singing into the public modern sphere. She became widely known as the Sultana of Tarab and is often described as the first woman to stand on the stage in Egypt and the Arab world."
      },
      {
        name: "Dawud Husni",
        role: "Major Egyptian composer and musician",
        years: "1870–1937",
        description: "One of the great composers of the Nahda, with a special place in the development of Arabic opera, to which he is often linked as one of its pioneers. He also carried the heritage of the dawr and the muwashshah into a broader modern phase through his compositions for many singers."
      },
      {
        name: "Sayyid Darwish",
        role: "Renewing composer and singer, the 'Artist of the People'",
        years: "1892–1923",
        description: "The most decisive figure in linking the musical Nahda to modern social and political reality. Many regard him as the true reviver of musical renewal in Egypt and the Arab world, because he brought song closer to everyday life, the street, and the theatre, while tying music to social and national meaning in unprecedented ways."
      },
      {
        name: "Zakariyya Ahmad",
        role: "Major Egyptian composer who preserved the Eastern spirit",
        years: "1896–1961",
        description: "One of the great composers of the twentieth century, and a living extension of Nahda values within the modern era. He began with religious chant and tawashih, then moved into theatre, popular song, and tarab composition, becoming especially famous for his work with Umm Kulthum."
      },
      {
        name: "Salih Abd al-Hayy",
        role: "Classical tarab singer and one of the last bearers of Nahda aesthetics",
        years: "1896–1962",
        description: "He is one of the voices that preserved the older Eastern color in muwashshahat, mawwal, and improvisatory tarab. Although later in date, he remained faithful to Nahda style and is often seen as one of the last major representatives of that older vocal aesthetic before the shorter modern song fully took over."
      },
      {
        name: "Umm Kulthum",
        role: "Great Egyptian singer and symbol of modern Arabic song",
        years: "1904–1975",
        description: "Her presence in this era makes sense if we understand her as a figure linking two periods: the musical Nahda on one side and the later Golden Age on the other. She began with religious chant and sung poetry, then became one of the most important Arab voices of the twentieth century in Cairo."
      }
    ]
  },
  {
    id: "cairo-congress-1932",
    title: "The Cairo Congress of Arab Music",
    subtitle: "A turning point between preservation and modernization",
    period: "1932",
    content: "The Cairo Congress of 1932 was a decisive moment in the history of Arabic music because it brought together musicians and scholars from the Arab world and beyond in an effort to document the heritage and discuss its future. It marked a rare moment in which preserving authenticity met the desire for modernization.",
    highlights: ["Documentation", "Music research", "Preservation", "Modernization"],
    figures: [
      {
        name: "King Fuad I",
        role: "King of Egypt and patron of the congress",
        years: "1868–1936",
        description: "The first king of Egypt after its formal independence from Britain in 1922. His name is tied to the congress because he sponsored it politically and officially; the event formed part of a broader cultural project through which modern Egypt sought to display its role in patronizing the arts and musical scholarship."
      },
      {
        name: "Rodolphe d'Erlanger",
        role: "Scholar, baron, and musicologist interested in Arabic music",
        years: "1872–1932",
        description: "One of the major intellectual figures behind the very idea of the congress. He specialized in Tunisian and Arabic music and produced the large work La musique arabe. He also helped prepare the congress under King Fuad's patronage, although illness prevented his full participation before his death that same year."
      },
      {
        name: "Muhammad Hilmi Isa Pasha",
        role: "Statesman and Egyptian minister",
        years: "d. 1953",
        description: "He was not a musician in the direct artistic sense, but rather a figure of administration, law, and politics. His importance here comes from his official position in the Egyptian state at the time of the congress, representing its governmental and organizational side rather than its performing or theoretical musical side."
      },
      {
        name: "Mahmud Ahmad al-Hifni",
        role: "Egyptian musician, historian, and music scholar",
        years: "1896–1973",
        description: "One of the most important Egyptian names in writing about music and in modernizing music education. He is often credited with helping introduce the study of music into Egyptian schools, and his presence at the congress reflects the bridge between performance, scholarship, notation, and institutional education."
      },
      {
        name: "Ali al-Darwish",
        role: "Leading Aleppine musician and munshid",
        years: "ca. 1884–1952",
        description: "A major figure of the Aleppine school of inshad, muwashshahat, and maqam practice. Formed within a Mevlevi environment in Aleppo, he represented at the congress the deep Levantine continuation of modal and devotional traditions that were being studied and documented there."
      },
      {
        name: "Kamil al-Khulai",
        role: "Egyptian composer and historian of music",
        years: "1870–1931",
        description: "One of the leading figures of early twentieth-century Egyptian music, combining composition with writing on the history of Arabic music. His importance here lies in representing the late Nahda generation through which musical thought entered the realms of authorship and theoretical writing, not only oral transmission."
      },
      {
        name: "Tawfiq al-Sabbagh",
        role: "Musician, educator, and violinist from Aleppo",
        years: "1892–1964",
        description: "A figure who combined theoretical and practical musical formation, and became known for his role in teaching, composing, and helping to build modern musical life in Syria. His participation in Cairo confirms that he was seen as a representative of modern Levantine musical culture."
      },
      {
        name: "Rauf Yekta",
        role: "Turkish musician and musicologist",
        years: "1871–1935",
        description: "One of the leading theorists of Turkish music in the early twentieth century, and among the first to explain Turkish classical music in a European language. At the Cairo Congress he became especially known for rejecting the idea of a fully equalized twenty-four-quartertone scale, making him a central figure in its theoretical debates."
      },
      {
        name: "Muhammad al-Qubbanchi",
        role: "The great singer and renewer of the Iraqi maqam",
        years: "1904–1989",
        description: "One of the greatest figures of the Iraqi maqam in the twentieth century. His participation in the Cairo Congress of 1932 was a turning point in both his career and the history of the Iraqi maqam itself, because the recordings made there helped establish his renewed style and project his name beyond Baghdad."
      },
      {
        name: "Mas'ud Jamil",
        role: "Turkish musician and tanbur/cello player",
        years: "1902–1963",
        description: "One of the figures who represented the modern Turkish school of performance and recording at the Cairo Congress. Modern sources more often use the form Mesut Cemil, but the Arabicized form is retained here because that is how the file currently presents him."
      },
      {
        name: "Muhammad al-Sharif",
        role: "Performer from the Tunisian maluf tradition",
        years: "",
        description: "His importance appears mainly through the Cairo Congress recordings and his role in representing Tunisian maluf performance alongside figures such as Muhammad bin Hasan. It is best to keep his description brief, since his presence is clearer in the recording archive than in extended biographical entries."
      },
      {
        name: "Al-Arabi Bensari",
        role: "Master of the Tlemceni Andalusian school",
        years: "1870–1964",
        description: "One of the leading artists of Tlemcen in the twentieth century and among the most important bearers of the Algerian Andalusian heritage. His importance in the congress lies in representing the Tlemceni Andalusian school in its performative, inherited form."
      },
      {
        name: "Bela Bartok",
        role: "Hungarian composer and musicologist",
        years: "1881–1945",
        description: "One of the great composers of the twentieth century and one of the major scholars of comparative folk music. His presence at the congress embodied its international scholarly dimension, where Arabic music met some of the most important European figures in comparative musical research."
      },
      {
        name: "Henry George Farmer",
        role: "British musicologist specializing in Arabic music",
        years: "1882–1965",
        description: "Among the most prominent musicological Orientalists to specialize in Arabic musical heritage. He took part in the Cairo Congress and left diaries and detailed records of its proceedings, making him a key later source for understanding its internal structure and committee work."
      },
      {
        name: "Paul Hindemith",
        role: "German composer and musical theorist",
        years: "1895–1963",
        description: "One of the major German composers of the first half of the twentieth century and a significant name in modern musical theory. His presence at the congress shows that Cairo 1932 was not merely an internal Arab celebration, but a genuine international forum."
      },
      {
        name: "Curt Sachs",
        role: "German musicologist and expert in the history of musical instruments",
        years: "1881–1959",
        description: "One of the most important names in the history of organology and comparative musicology. At the Cairo Congress, he represented the scholarly, classificatory, and historical study of Arabic music from an international scientific perspective."
      },
      {
        name: "Robert Lachmann",
        role: "German ethnomusicologist and Orientalist",
        years: "1892–1939",
        description: "One of the major Western scholars of music in the Middle East and North Africa. He participated in the Cairo Congress and is closely associated with recording and documenting the performances presented there, making him crucial to the transformation of the congress into a lasting sonic archive as well as a theoretical event."
      }
    ]
  },
  {
    id: "golden-age",
    title: "The Golden Age of Arabic Music",
    subtitle: "The peak of artistic and popular influence through radio, cinema, and major concerts",
    period: "1930s to 1970s",
    content: "In this era, Arabic music became a broad mass culture through radio, cinema, records, and major public concerts. It was the period in which the image of the great Arab star fully solidified, and Arabic song reached the height of its artistic and popular influence.",
    highlights: ["Radio", "Cinema", "Records", "The great Arab star"],
    figures: [
      {
        name: "Umm Kulthum",
        role: "Great Egyptian singer and symbol of Arab tarab",
        years: "1904–1975",
        description: "Umm Kulthum is widely regarded as the greatest tarab voice of the twentieth-century Arab world. She moved from religious chant and sung poetry to become a transregional cultural phenomenon. She also links two eras at once: she extends the Nahda on one side and stands at the center of the Golden Age on the other."
      },
      {
        name: "Muhammad Abd al-Wahhab",
        role: "Singer, composer, and musical modernizer",
        years: "1902–1991",
        description: "One of the most influential figures in the modernization of Arabic music in the twentieth century. He combined singing, composition, and cinema, and expanded Arabic song by introducing new rhythmic and orchestral approaches."
      },
      {
        name: "Zakariyya Ahmad",
        role: "Major Egyptian composer who preserved the Eastern spirit",
        years: "1896–1961",
        description: "Zakariyya Ahmad represents one of the clearest continuations of the authentic Eastern spirit within the Golden Age. He began in religious chant and tawashih, then became one of the major composers of the twentieth century, especially through his work with Umm Kulthum."
      },
      {
        name: "Riyad al-Sunbati",
        role: "Composer and oud player among the great builders of modern Arabic song",
        years: "1906–1981",
        description: "One of the most influential composers in shaping the long-form classical Arabic song in the twentieth century, especially through his association with Umm Kulthum. He combined modal depth with large-scale melodic architecture."
      },
      {
        name: "Muhammad al-Qasabji",
        role: "Composer, oud player, and musical innovator",
        years: "1892–1966",
        description: "A pivotal figure in the development of modern Arabic song, because he blended a deeply Eastern musical language with a more exploratory sense of arrangement and melodic design. His name is tied to major works for Umm Kulthum, Asmahan, and Layla Murad."
      },
      {
        name: "Shaykh Imam Isa",
        role: "Popular and political singer-composer",
        years: "1918–1995",
        description: "Shaykh Imam represents a different face of modern Arabic song: not the official radio star so much as the voice of protest, the street, and popular classes. His greatest importance came through his partnership with Ahmad Fu'ad Nigm, in which song became a direct political instrument."
      },
      {
        name: "Ahmad Fu'ad Nigm",
        role: "Egyptian colloquial poet closely tied to political song",
        years: "1929–2013",
        description: "Not a singer or composer, but one of the most important figures in modern Arabic song because his colloquial poems—together with Shaykh Imam—became the voice of a wide protest public. His presence here shows that Arabic song was not only romance and cinema, but also direct social and political critique."
      },
      {
        name: "Abd al-Halim Hafiz",
        role: "Modern Egyptian singer and symbol of romantic and national song",
        years: "1929–1977",
        description: "One of the key voices that carried Arabic song to a broader audience through radio and cinema. He was marked by an emotionally charged style, strong cinematic presence, and a direct association with the image of the modern mass star."
      },
      {
        name: "Farid al-Atrash",
        role: "Singer, composer, oud player, and actor",
        years: "1910–1974",
        description: "One of the pillars of Arabic song in the twentieth century, combining singing, cinema, composition, and refined oud playing. He offered the model of the total artist who shaped his song in film, on stage, and in recording."
      },
      {
        name: "Asmahan",
        role: "Syrian/Egyptian singer and one of the most important female voices of the 1940s",
        years: "1912–1944",
        description: "Despite her short life, Asmahan remained one of the most distinctive and influential Arab voices of the first half of the twentieth century. She was among the very few female singers placed in direct artistic comparison with Umm Kulthum."
      },
      {
        name: "Fairuz",
        role: "Great Lebanese singer and symbol of modern Levantine song",
        years: "1934–",
        description: "Fairuz represents the expansion of the Golden Age beyond Egypt, especially through radio and Lebanese musical theatre. Together with the Rahbani brothers, she became a voice that joined poetry, theatre, and concise song into a distinct modern Levantine sound."
      },
      {
        name: "Asi Rahbani",
        role: "Lebanese composer, musician, and theatrical producer",
        years: "1923–1986",
        description: "One of the main creators of the Rahbani school, which redefined Lebanese song and Arabic musical theatre. His name is directly tied to the rise of Fairuz and to the spread of a new Levantine musical language."
      },
      {
        name: "Mansour Rahbani",
        role: "Lebanese composer, poet, writer, and producer",
        years: "1925–2009",
        description: "The complementary partner to Asi in the Rahbani project. He helped write, compose, and construct the Rahbani theatrical world, so his role here is not only that of a composer, but also that of an architect of modern Arabic musical theatre."
      },
      {
        name: "Wadih al-Safi",
        role: "Lebanese singer and composer, one of the great mountain and mawwal voices",
        years: "1921–2013",
        description: "One of the figures who gave Lebanese rural and folkloric song a broad Arab presence. He combined vocal strength, mawwal, and mountain color, helping establish a clear Lebanese identity within modern Arabic music."
      },
      {
        name: "Warda al-Jazairia",
        role: "Algerian/Arab singer among the major voices of the twentieth century",
        years: "1939–2012",
        description: "Warda represents the extension of the Golden Age into a later phase of modern Arabic song, especially through Egypt. Her name is tied to major romantic song and to collaborations with leading composers, while also linking the Maghreb to the Egyptian center of Arab stardom."
      }
    ]
  },
  {
    id: "modern-pop-transition",
    title: "The Shift toward Modern Arabic Song",
    subtitle: "The expansion of the mass market and the rise of the short song and image culture",
    period: "1970s to the 2000s",
    content: "From the 1970s onward, the Arab musical scene increasingly moved toward the mass market, rapid production, and television-based circulation. Over time, styles emerged that were closer to pop, and the short song and the image that accompanied it became more dominant, even as some artists continued to preserve melodic depth and meaningful lyrics.",
    highlights: ["Mass market", "Television", "Arab pop", "Short song format"],
    figures: [
      {
        name: "Ziad Rahbani",
        role: "Lebanese composer, musician, and playwright",
        years: "1956–2025",
        description: "Ziad Rahbani represents a different face of the shift toward modern Arabic song: he blended Arabic music, jazz, theatrical sensibility, and political satire. He left a deep mark on entire generations, especially through his work with Fairuz and his critical musical theatre."
      },
      {
        name: "Marcel Khalife",
        role: "Lebanese composer, singer, and oud player",
        years: "1950–",
        description: "Marcel Khalife carried modern Arabic song into a space that joined poetry, political commitment, the individual voice, and the oud. His name is especially tied to the musical setting of Mahmoud Darwish's poetry and to a politically engaged song that remained broadly popular."
      },
      {
        name: "George Wassouf",
        role: "Mass-popular Syrian singer, known as the 'Sultan of Tarab'",
        years: "1961–",
        description: "George Wassouf represents the continued power of the tarab-oriented voice within the age of the mass market. Famous from youth under the title 'Sultan of Tarab,' he remained for decades one of the most widely loved Arab singers while retaining an emotional, deeply tarab-inflected style."
      },
      {
        name: "Amr Diab",
        role: "Egyptian singer-composer and one of the main architects of modern Arab pop",
        years: "1961–",
        description: "Few names express the shift to shorter, more widely marketable Arabic song more clearly than Amr Diab. He is strongly associated with blending Egyptian and Western rhythmic languages, and became the model of the Arab artist who combines mass appeal, digital success, and cross-border popularity."
      },
      {
        name: "Kazem al-Saher",
        role: "Iraqi singer and composer",
        years: "1957–",
        description: "Kazem al-Saher is a central figure in modern Arabic song because he offered a model that joined classical Arabic poetry with mass stardom. He preserved attention to text and melodic development while also becoming one of the most widely recognized Arab artists beyond Iraq."
      },
      {
        name: "Assala Nasri",
        role: "Syrian singer and one of the major voices of the 1990s and after",
        years: "1969–",
        description: "Assala represents the cross-border form of modern Arabic song. She emerged from Syria, then established a major Arab presence across Egypt, the Gulf, and the Levant, combining strong tarab ability with the structures of contemporary commercial song."
      },
      {
        name: "Majida al-Roumi",
        role: "Lebanese singer and one of the major classical-modern voices",
        years: "1956–",
        description: "Majida al-Roumi represents a different line within modern Arabic song: a voice closer to classical grandeur, poetry, and a humanistic message. She rose through Lebanese television and Studio El Fan, then became one of the most respected Arab voices on major stages."
      },
      {
        name: "Fadl Shaker",
        role: "Mass-popular Lebanese singer",
        years: "1969–",
        description: "In his earlier career, Fadl Shaker represented the highly successful romantic male singer of the early 2000s, with an accessible voice and broad audience. His later trajectory, however, involved a sharp break and controversial turn after 2013, so he belongs here as part of the mass-market phase with that later complication noted."
      },
      {
        name: "Ragheb Alama",
        role: "Lebanese singer and television-era mass star",
        years: "1962–",
        description: "One of the clearest faces of the rise of filmed Arabic song and television stardom in the 1980s and 1990s. His name is associated with the spread of the short song, modern image culture, and an early prominent place in the history of the Arab music video."
      },
      {
        name: "Najwa Karam",
        role: "Lebanese singer among the leading voices of mass-market song",
        years: "1966–",
        description: "She shows how Lebanese song entered the wider Arab mass market while preserving local elements such as the mawwal and a clearly Lebanese spirit. She became a highly visible television personality and a cornerstone of Lebanese popular song."
      },
      {
        name: "Latifa",
        role: "Tunisian/Arab singer and one of the symbols of modern song",
        years: "1961–",
        description: "Latifa represents the Maghrebi crossing into the Egyptian and Arab mainstream within modern song. She built her project between Tunisia and Egypt, sang in Arabic, French, and English, and became one of the recognizable faces of the broad Arab market before the purely platform-driven era."
      },
      {
        name: "Elissa",
        role: "Lebanese singer and one of the leading faces of modern romantic song",
        years: "1971–",
        description: "Elissa embodies the rise of commercially successful romantic song at the height of the satellite channel, Rotana, and music-video era. Her name is strongly associated with mass popularity and very wide circulation across the Arab world."
      },
      {
        name: "Nancy Ajram",
        role: "Lebanese singer and one of the leading symbols of Arab pop",
        years: "1983–",
        description: "Nancy Ajram is one of the clearest examples of the move from television pop star to cross-generational mass celebrity. She helped consolidate the short Arabic pop song, modern image culture, and broad public stardom."
      },
      {
        name: "Hussain Al Jassmi",
        role: "Emirati singer-composer and one of the major faces of Gulf-Arab popular song",
        years: "1979–",
        description: "Al Jassmi broadens this era geographically, because he represents the strong entry of the Gulf voice into the modern Arab mass market. He moved successfully between Gulf and Egyptian song and reached a very wide Arab audience through concerts and television."
      }
    ]
  },
  {
    id: "digital-platform-era",
    title: "The Age of Digital Platforms and Cross-Border Identity",
    subtitle: "Mixing Arabic with contemporary styles for regional and global audiences",
    period: "2010s to the present",
    content: "In the digital era, Arabic music began to spread through platforms and social media at an unprecedented speed. A new generation emerged that blends Arabic with contemporary languages and styles, addressing both Arab and global audiences at once without losing its link to Arabic musical identity.",
    highlights: ["Digital platforms", "Social media", "Global audience", "Cross-border identity"],
    figures: [
      {
        name: "Bayou",
        role: "Egyptian singer-songwriter from the new wave of Arabic R&B",
        years: "Active since the late 2010s",
        description: "Bayou represents the Egyptian face of the new digital hybrid between R&B and Arabic pop. Having grown up across Jeddah, Dubai, Boston, and Cairo, he came to embody a generation shaping a contemporary Arab identity that moves easily between local and global contexts."
      },
      {
        name: "Saint Levant",
        role: "Multilingual Palestinian singer and rapper",
        years: "2000–",
        description: "One of the clearest examples of cross-border Arab identity in new music. He writes and sings in Arabic, English, and French, and rose quickly through TikTok and global platforms while keeping Palestinian identity visibly central to his work."
      },
      {
        name: "Elyanna",
        role: "Palestinian singer from the new Arab-global generation",
        years: "2002–",
        description: "Elyanna emerged as a young Arab voice blending Arabic with Latin-inflected rhythms and alternative contemporary pop. She drew global attention as one of the first Arab artists to enter major Western spaces in this way while clearly maintaining her Palestinian identity."
      },
      {
        name: "DYSTINCT",
        role: "Moroccan/Belgian singer from the Europe-Arab crossover generation",
        years: "1998–",
        description: "DYSTINCT represents the idea of multilingual, multi-reference identity inside new Arabic music. He combines Darija, French, Dutch, and English, and became one of the most prominent figures carrying a Maghrebi sensibility into a broader global audience."
      },
      {
        name: "Issam Alnajjar",
        role: "Palestinian/Jordanian singer from the viral-platform generation",
        years: "2003–",
        description: "Issam Alnajjar is one of the clearest examples of a new Arab stardom made by platforms. He rose rapidly through TikTok with Hadal Ahbek, then became associated with the early wave around Universal Arabic Music, combining simplicity with unusually fast spread."
      },
      {
        name: "Wegz",
        role: "Egyptian rapper and one of the major faces of digital Arab hip-hop",
        years: "1998–",
        description: "Wegz represents the major rise of rap and hip-hop within contemporary Arabic music. He blended trap, mahragan, sha'bi, and electronic influences, and helped move Egyptian rap from the margins to the center of the Arab mass scene."
      }
    ]
  }
];
const historySources = [
  {
    name: "Encyclopaedia Britannica",
    url: "https://www.britannica.com/",
    usedFor: [
      "Umm Kulthum",
      "Abd al-Halim Hafiz",
      "Fairuz",
      "Bela Bartok",
      "King Fuad I",
      "al-Kindi",
      "al-Farabi",
      "Ibrahim al-Mawsili",
      "Ishaq al-Mawsili",
      "Abu al-Faraj al-Isfahani",
      "Ziryab",
      "Ibn Quzman"
    ],
    notes: [
      "Basic biographies",
      "Dates",
      "Historical significance",
      "Artistic importance"
    ]
  },
  {
    name: "Reuters",
    url: "https://www.reuters.com/",
    usedFor: [
      "Ziad Rahbani"
    ],
    notes: [
      "Death date update",
      "Latest timeline correction",
      "General description of his cultural role"
    ]
  },
  {
    name: "Brill",
    url: "https://brill.com/",
    usedFor: [
      "Mikhail Mishaqa",
      "Safi al-Din al-Urmawi",
      "Henry George Farmer",
      "Cairo Congress of Arab Music 1932"
    ],
    notes: [
      "Academic context",
      "Music theory debates",
      "Late classical and post-classical positioning",
      "Conference documentation context"
    ]
  },
  {
    name: "Stanford Encyclopedia of Philosophy",
    url: "https://plato.stanford.edu/",
    usedFor: [
      "Ibn Bajja"
    ],
    notes: [
      "Intellectual biography",
      "Philosophical context",
      "Relationship to Andalusian scholarly culture"
    ]
  },
  {
    name: "State Information Service Egypt",
    url: "https://sis.gov.eg/",
    usedFor: [
      "Abdu al-Hamuli",
      "Yusuf al-Manyalawi",
      "Salama Higazi",
      "Dawud Husni",
      "Zakariyya Ahmad",
      "Riyad al-Sunbati",
      "Sayyid Darwish",
      "Salih Abd al-Hayy"
    ],
    notes: [
      "Egyptian biographies",
      "Roles in the Nahda and modern Arabic music",
      "Dates",
      "Artistic importance"
    ]
  },
  {
    name: "Maspero",
    url: "https://www.maspero.eg/",
    usedFor: [
      "Muhammad Uthman",
      "Kamil al-Khulai",
      "Munira al-Mahdiyya",
      "Mahmud Ahmad al-Hifni"
    ],
    notes: [
      "Biographical summaries",
      "Role in Egyptian musical development",
      "Nahda and early modern music context"
    ]
  },
  {
    name: "AMAR Foundation",
    url: "https://www.amar-foundation.org/",
    usedFor: [
      "Muhammad Uthman",
      "Abdu al-Hamuli",
      "Salama Higazi",
      "Dawud Husni",
      "Salih Abd al-Hayy"
    ],
    notes: [
      "Performance heritage",
      "Recording-related context",
      "Arab musical legacy",
      "Historical singing practice"
    ]
  },
  {
    name: "Bibliothèque nationale de France (BnF)",
    url: "https://www.bnf.fr/",
    usedFor: [
      "Cairo Congress of Arab Music 1932"
    ],
    notes: [
      "General conference framing",
      "International dimension",
      "Historical importance"
    ]
  },
  {
    name: "Qantara",
    url: "https://qantara.de/",
    usedFor: [
      "Cairo Congress of Arab Music 1932"
    ],
    notes: [
      "Cultural significance of the congress",
      "Preservation and modernization context"
    ]
  },
  {
    name: "Syrian History / Arab Music Magazine / related Syrian sources",
    url: "https://syrmh.com/",
    usedFor: [
      "Ali al-Darwish",
      "Tawfiq al-Sabbagh"
    ],
    notes: [
      "Aleppine and Syrian musical context",
      "Educational and performance roles",
      "Conference participation background"
    ]
  },
  {
    name: "Studies on Rauf Yekta and Ottoman/Turkish music theory",
    url: "https://wom-journal.org/",
    usedFor: [
      "Rauf Yekta"
    ],
    notes: [
      "Musicological role",
      "Theoretical debates",
      "Position on tuning and the 24-quarter-tone issue"
    ]
  },
  {
    name: "Iraqi cultural sources on Muhammad al-Qubbanchi",
    url: "https://www.irfaasawtak.com/",
    usedFor: [
      "Muhammad al-Qubbanchi"
    ],
    notes: [
      "Iraqi maqam context",
      "Conference participation",
      "Impact of Cairo recordings on his legacy"
    ]
  },
  {
    name: "Turkish reference sources on Mesut Cemil",
    url: "https://islamansiklopedisi.org.tr/",
    usedFor: [
      "Mas'ud Jamil"
    ],
    notes: [
      "Identity clarification",
      "Turkish performance background",
      "Conference participation"
    ]
  },
  {
    name: "Cairo Congress recording archives / Bolingo",
    url: "https://www.bolingo.org/",
    usedFor: [
      "Muhammad al-Sharif"
    ],
    notes: [
      "Conference recording documentation",
      "Association with Tunisian maluf performance",
      "Archival evidence rather than a full standalone biography"
    ]
  },
  {
    name: "Dar al Hikma and related Algerian sources",
    url: "https://www.daralhikma.org/",
    usedFor: [
      "al-Arabi Bensari"
    ],
    notes: [
      "Tlemcen Andalusian music context",
      "Performance legacy",
      "Conference representation"
    ]
  },
  {
    name: "Wikipedia and general biography pages",
    url: "https://www.wikipedia.org/",
    usedFor: [
      "Mohammed Abdel Wahab",
      "Mohamed El Qasabgi",
      "El Sheikh Emam",
      "Ahmed Fouad Negm",
      "Farid al-Atrash",
      "Asmahan",
      "Assi Rahbani",
      "Mansour Rahbani",
      "Wadih El Safi",
      "Warda Al-Jazairia",
      "Marcel Khalife",
      "George Wassouf",
      "Kadim Al Sahir",
      "Assala",
      "Majida El Roumi",
      "Ragheb Alama",
      "Najwa Karam",
      "Latifa",
      "Elissa",
      "Nancy Ajram",
      "Hussain Al Jassmi",
      "Bayou",
      "Saint Levant",
      "Elyanna",
      "DYSTINCT",
      "Issam Alnajjar",
      "Wegz",
      "Rodolphe d'Erlanger",
      "Robert Lachmann",
      "Paul Hindemith",
      "Curt Sachs"
    ],
    notes: [
      "Supporting biographical information",
      "Name normalization",
      "Basic timeline support",
      "Used where stronger single-source institutional biographies were not available in one place"
    ]
  },
  {
    name: "Official and platform-era artist sources",
    url: "https://open.spotify.com/",
    usedFor: [
      "DYSTINCT",
      "Issam Alnajjar",
      "Wegz",
      "Saint Levant",
      "Elyanna",
      "Bayou",
      "Amr Diab"
    ],
    notes: [
      "Platform-era visibility",
      "Cross-border identity context",
      "Digital-era positioning",
      "Audience and streaming-era relevance"
    ]
  },
  {
    name: "AP News",
    url: "https://apnews.com/",
    usedFor: [
      "Fadl Shaker"
    ],
    notes: [
      "Later-career trajectory",
      "Public context around the interruption in his artistic path"
    ]
  },
  {
    name: "Legado Andalusi and related Andalusian studies",
    url: "https://www.legadoandalusi.es/",
    usedFor: [
      "al-Qubri"
    ],
    notes: [
      "Name variation caution",
      "Differences in attribution",
      "Cautious treatment of the muwashshah origin question"
    ]
  },
  {
    name: "WorldCat / library catalog references",
    url: "https://search.worldcat.org/",
    usedFor: [
      "Muhammad Shihab al-Din"
    ],
    notes: [
      "Fuller identity confirmation in description",
      "Book attribution",
      "Late Ottoman literary-musical context"
    ]
  }
];
