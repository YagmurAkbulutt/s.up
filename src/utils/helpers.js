import { Dimensions, Keyboard } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const dismissKeyboard = () => {
  Keyboard.dismiss();
};




export const imageData = [
  {
    id: 1,
    username: "john_doe",
    description: "Güzel bir gün! 🌞🏡",
    tags: ["#sunny", "#home", "#nature"],
    images: [require("../assets/home-6.jpeg"), require("../assets/home-7.jpeg")],
  },
  {
    id: 2,
    username: "jane_smith",
    description: "Yeni dekorasyon fikirleri! 💡✨",
    tags: ["#decor", "#ideas", "#inspiration"],
    images: [require("../assets/home-2.png"), require("../assets/home-3.png")],
  },
  {
    id: 3,
    username: "alex_wood",
    description: "Evde huzur ve mutluluk! 🏡❤️",
    tags: ["#cozy", "#home", "#peaceful"],
    images: [require("../assets/home-3.png"), require("../assets/home-6.jpeg")],
  },
  {
    id: 4,
    username: "emily_rose",
    description: "Minimalist yaşam tarzı. 🍃✨",
    tags: ["#minimal", "#interior", "#design"],
    images: [require("../assets/home-4.png"), require("../assets/home-3.png")],
  },
  {
    id: 5,
    username: "mike_jordan",
    description: "Doğa ile iç içe bir ev! 🌿🏠",
    tags: ["#green", "#home", "#ecoFriendly"],
    images: [require("../assets/home-2.png"), require("../assets/home-3.png")],
  },
  {
    id: 6,
    username: "sarah_connor",
    description: "Rahat bir oturma alanı! 🛋️☕",
    tags: ["#comfort", "#livingroom", "#cozy"],
    images: [require("../assets/home-3.png"), require("../assets/home-6.jpeg")],
  },
  {
    id: 7,
    username: "david_smith",
    description: "Güneşli sabah kahvesi! ☕🌞",
    tags: ["#morning", "#coffee", "#sunnyday"],
    images: [require("../assets/home-4.png"), require("../assets/home-3.png")],
  },
  {
    id: 8,
    username: "anna_white",
    description: "Şık bir oturma odası! ✨🏡",
    tags: ["#modern", "#interior", "#style"],
    images: [require("../assets/home-2.png"), require("../assets/home-3.png")],
  },
  {
    id: 9,
    username: "chris_black",
    description: "Evinizde sıcak bir hava yaratın! 🔥🏡",
    tags: ["#warm", "#homedecor", "#cozyvibes"],
    images: [require("../assets/home-4.png"), require("../assets/home-3.png")],
  },
  {
    id: 10,
    username: "sophie_green",
    description: "Doğal ışık her zaman iyidir! ☀️🏠",
    tags: ["#natural", "#light", "#homeinspo"],
    images: [require("../assets/home-2.png"), require("../assets/home-3.png")],
  },
];


export const messageList = [
  {
    id:1,
    userImage: require("../assets/chatbot.png"),
    username: "Eda Style Up",
    messages: [
      { text: "Bugün gerçekten yoğun geçti, biraz dinlenmeye ihtiyacım var.", timestamp: "2025-02-10T18:30:00Z" },
      { text: "Yarın için güzel bir kahve öneriniz var mı?", timestamp: "2025-02-11T08:15:00Z" },
      
    ]
  },
  {
    id: 2,
    userImage: require("../assets/profilePhoto.png"),
    username: "ayse_kaya",
    name: "Ayşe Kaya",
    followers: 200,
    post : 23,
    messages: [
      { text: "Bugün gerçekten yoğun geçti, biraz dinlenmeye ihtiyacım var.", timestamp: "2025-02-10T18:30:00Z" },
      { text: "Yarın için güzel bir kahve öneriniz var mı?", timestamp: "2025-02-11T08:15:00Z" },
      
    ]
  },
  {
    id: 3,
    userImage: require("../assets/profilePhoto.png"),
    username: "mehmet_yildiz",
    name: "Mehmet Yıldız",
    followers: 200,
    post : 5,
    messages: [
      { text: "Yeni bir projeye başladım, umarım harika bir şey ortaya çıkar!", timestamp: "2025-02-12T10:45:00Z" },
      { text: "React Native hakkında daha fazla şey öğreniyorum.", timestamp: "2025-02-12T14:30:00Z" },
      { text: "Bugün çok verimli geçti!", timestamp: "2025-02-12T19:00:00Z" }
    ]
  },
  {
    id: 4,
    userImage: require("../assets/profilePhoto.png"),
    username: "zeynep_dmr",
    name: "Zeynep Demir",
    followers: 270,
    post : 12,
    messages: [
      { text: "Bu hafta sonu bir şeyler okumayı planlıyorum, öneriniz var mı?", timestamp: "2025-02-13T07:20:00Z" }
    ]
  },
  {
    id: 5,
    userImage: require("../assets/profilePhoto.png"),
    username: "ali_toprak",
    name: "Ali Toprak",
    followers: 140,
    post: "",
    messages: [
      { text: "Hava bugün harika! Bir yürüyüş yapmayı düşünüyorum.", timestamp: "2025-02-11T09:00:00Z" },
      { text: "Yeni bir podcast keşfettim, öneririm!", timestamp: "2025-02-11T12:45:00Z" },
      { text: "Sabah kahvesi olmadan güne başlayamıyorum.", timestamp: "2025-02-11T16:20:00Z" },
      { text: "Yazılım dünyası gerçekten çok ilginç!", timestamp: "2025-02-11T20:10:00Z" },
      { text: "Bugün spor salonuna gittim, iyi hissediyorum!", timestamp: "2025-02-12T08:30:00Z" }
    ]
  },
  {
    id: 6,
    userImage: require("../assets/profilePhoto.png"),
    username: "emre_can",
    name: "Emre Can",
    followers: 500,
    post : 65,
    messages: [
      { text: "Yeni bir kod editörü denedim, süper!", timestamp: "2025-02-12T17:00:00Z" }
    ]
  },
  {
    id: 7,
    userImage: require("../assets/profilePhoto.png"),
    username: "selin_karaca",
    name: "Selin Karaca",
    followers: 456,
    post : 33,
    messages: [
      { text: "Bugün harika bir kitap okudum!", timestamp: "2025-02-12T11:30:00Z" },
      { text: "Siz ne okuyorsunuz?", timestamp: "2025-02-12T15:20:00Z" }
    ]
  },
  {
    id: 8,
    userImage: require("../assets/profilePhoto.png"),
    username: "berk_tan",
    name: "Berk Tan",
    followers: 2450,
    post : "",
    messages: [
      { text: "Akşam yemeği için yeni bir tarif denedim, süper oldu!", timestamp: "2025-02-13T18:45:00Z" },
      { text: "Sizin favori yemek tarifiniz nedir?", timestamp: "2025-02-13T20:10:00Z" }
    ]
  },
  {
    id: 9,
    userImage: require("../assets/profilePhoto.png"),
    username: "melisa_aktas",
    name: "Melisa Aktaş",
    followers: 670,
    post : 87,
    messages: [
      { text: "Bugün yeni bir müzik keşfettim, harika!", timestamp: "2025-02-13T09:30:00Z" },
      { text: "En son hangi şarkıyı dinlediniz?", timestamp: "2025-02-13T14:20:00Z" }
    ]
  },
  {
    id: 10,
    userImage: require("../assets/profilePhoto.png"),
    username: "can_dogan",
    name: "Can Doğan",
    followers: 645,
    post : 78,
    messages: [
      { text: "Spor yapmaya başladım, enerjim arttı!", timestamp: "2025-02-14T07:00:00Z" },
      { text: "Bugün kaç adım attınız?", timestamp: "2025-02-14T12:45:00Z" }
    ]
  },
  {
    id: 11,
    userImage: require("../assets/profilePhoto.png"),
    username: "nazli_kurt",
    name: "Nazlı Kurt",
    followers: 786,
    post : 23,
    messages: [
      { text: "Yeni bir film izledim, çok etkileyiciydi!", timestamp: "2025-02-14T21:15:00Z" },
      { text: "Son zamanlarda izlediğiniz en iyi film hangisi?", timestamp: "2025-02-14T23:30:00Z" }
    ]
  },
];

export const users = [
  {
    id: 1,
    username: "john_doe",
    fullName: "John Doe",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 150,
    following: 175,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 2,
    username: "jane_smith",
    fullName: "Jane Smith",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 150,
    following: 175,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 3,
    username: "michael_brown",
    fullName: "Michael Brown",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 150,
    following: 175,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 4,
    username: "emily_johnson",
    fullName: "Emily Johnson",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 320,
    following: 410,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 5,
    username: "david_wilson",
    fullName: "David Wilson",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 150,
    following: 175,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 6,
    username: "sophia_miller",
    fullName: "Sophia Miller",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 400,
    following: 380,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  },
  {
    id: 7,
    username: "daniel_clark",
    fullName: "Daniel Clark",
    profilePhoto: require('../assets/profilePhoto.png'),
    followers: 200,
    following: 220,
    posts: [
      require('../assets/entry-1.png'),
      require('../assets/entry-2.png'),
      require('../assets/entry-3.png'),
      require('../assets/entry-4.png')
    ]
  }
];


export const notifications = [
  {
    id: 1,
    type: "follow",
    user: {
      id: 201,
      name: "Ayşe Demir",
      profileImage: require("../assets/profilePhoto.png"),
    },
    timestamp: "2025-03-02T13:21:00Z",
    isRead: false,
  },
  {
    id: 2,
    type: "like",
    user: {
      id: 202,
      name: "Burak Yıldırım",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 301,
      postImage: require("../assets/profilePhoto.png"),
    },
    timestamp: "2025-03-01T10:15:00Z",
    isRead: false,
  },
  {
    id: 3,
    type: "comment",
    user: {
      id: 203,
      name: "Zeynep Çelik",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 302,
      comment: "Muhteşem bir kare!",
    },
    timestamp: "2025-02-26T18:30:00Z",
    isRead: true,
  },
  {
    id: 4,
    type: "mention",
    user: {
      id: 204,
      name: "Emre Koç",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 303,
    },
    timestamp: "2025-02-25T14:45:00Z",
    isRead: true,
  },
  {
    id: 5,
    type: "follow",
    user: {
      id: 205,
      name: "Fatma Karaca",
      profileImage: require("../assets/profilePhoto.png"),
    },
    timestamp: "2025-02-24T09:12:00Z",
    isRead: false,
  },
  {
    id: 6,
    type: "like",
    user: {
      id: 206,
      name: "Mehmet Şahin",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 304,
      postImage: require("../assets/profilePhoto.png"),
    },
    timestamp: "2025-02-23T15:30:00Z",
    isRead: false,
  },
  {
    id: 7,
    type: "comment",
    user: {
      id: 207,
      name: "Selin Aksoy",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 305,
      comment: "Harika paylaşım!",
    },
    timestamp: "2025-02-22T12:00:00Z",
    isRead: true,
  },
  {
    id: 8,
    type: "mention",
    user: {
      id: 208,
      name: "Ali Tan",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 306,
    },
    timestamp: "2025-02-21T11:45:00Z",
    isRead: true,
  },
  {
    id: 9,
    type: "follow",
    user: {
      id: 209,
      name: "Deniz Arslan",
      profileImage: require("../assets/profilePhoto.png"),
    },
    timestamp: "2025-02-20T08:30:00Z",
    isRead: false,
  },
  {
    id: 10,
    type: "like",
    user: {
      id: 210,
      name: "Hakan Demirtaş",
      profileImage: require("../assets/profilePhoto.png"),
    },
    content: {
      postId: 307,
      postImage: "https://example.com/post307.jpg",
    },
    timestamp: "2025-02-19T14:20:00Z",
    isRead: false,
  },
];

export const commentsData = [
  {
    id: "1",
    user: "minealada",
    text: "Bu makale gerçekten çok bilgilendirici olmuş!",
    profilePhoto: require('../assets/profilePhoto.png'),
    likes: 53,
    liked: false,
    replies: [
      {
        id: "1-1",
        user: "burak_karaca",
        text: "Evet, bence de! Yazar çok güzel açıklamış.",
        profilePhoto: require('../assets/profilePhoto.png'),
        likes: 234,
        liked: false,
      },
      {
        id: "1-2",
        user: "elif_yildiz",
        text: "Kaynaklar çok sağlam, güvenilir bilgiler içeriyor.",
        profilePhoto: require('../assets/profilePhoto.png'),
        likes: 312,
        liked: false,
      },
    ],
  },
  {
    id: "2",
    user: "caner_tez",
    text: "Güzel bir paylaşım olmuş, teşekkürler!",
    profilePhoto: require('../assets/profilePhoto.png'),
    likes: 15000,
    liked: false,
    replies: [],
  },
  {
    id: "3",
    user: "selin_arslan",
    text: "Kendi deneyimlerimi de ekleyerek bir yorum bırakıyorum. Benzer bir makaleyi daha önce okumuştum.",
    profilePhoto: require('../assets/profilePhoto.png'),
    likes: 7500,
    liked: false,
    replies: [
      {
        id: "3-1",
        user: "mehmet_turan",
        text: "Hangi makale olduğunu paylaşabilir misin?",
        profilePhoto: require('../assets/profilePhoto.png'),
        likes: 89,
        liked: false,
      },
    ],
  },
  {
    id: "4",
    user: "ahmet_dogan",
    text: "Bu konuda daha detaylı bir makale önerir misiniz?",
    profilePhoto: require('../assets/profilePhoto.png'),
    likes: 5400,
    liked: false,
    replies: [
      // {
      //   id: "4-1",
      //   user: "zeynep_kaya",
      //   text: "Ben Harvard Business Review’da benzer bir içerik okumuştum.",
      //   profilePhoto: require('../assets/profilePhoto.png'),
      //   likes: 132,
      //   liked: false,
      // },
    ],
  },
  {
    id: "5",
    user: "cemal_karan",
    text: "Konu çok güzel ele alınmış ama birkaç noktada eksiklik var gibi geldi.",
    profilePhoto: require('../assets/profilePhoto.png'),
    likes: 9200,
    liked: false,
    replies: [
      {
        id: "5-1",
        user: "minealada",
        text: "Eksik olduğunu düşündüğün noktaları paylaşabilir misin?",
        profilePhoto: require('../assets/profilePhoto.png'),
        likes: 154,
        liked: false,
      },
      {
        id: "5-2",
        user: "burak_karaca",
        text: "Bence de bazı yerler daha detaylı anlatılabilirdi.",
        profilePhoto: require('../assets/profilePhoto.png'),
        likes: 110,
        liked: false,
      },
    ],
  },
];

export const post = [
  {
    id:1,
    postPhoto: require("../assets/entry-1.png")
  },
  {
    id:2,
    postPhoto: require("../assets/entry-2.png")
  },
  {
    id:3,
    postPhoto: require("../assets/entry-3.png")
  },
  {
    id:4,
    postPhoto: require("../assets/entry-4.png")
  },
  {
    id:5,
    postPhoto: require("../assets/entry-1.png")
  },
  {
    id:6,
    postPhoto: require("../assets/entry-2.png")
  },
  {
    id:7,
    postPhoto: require("../assets/entry-3.png")
  },
  {
    id:8,
    postPhoto: require("../assets/entry-4.png")
  },
  {
    id:9,
    postPhoto: require("../assets/entry-1.png")
  },
  {
    id:10,
    postPhoto: require("../assets/entry-2.png")
  },
  {
    id:11,
    postPhoto: require("../assets/entry-3.png")
  },
  {
    id:12,
    postPhoto: require("../assets/entry-4.png")
  },
]







