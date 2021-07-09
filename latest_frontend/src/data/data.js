import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import HeadsetIcon from '@material-ui/icons/Headset';

export const mainFeaturedPost = {
    title: "Shade",
    description:
      "Anti-racism campaigners, educators, academics and public figures talk about their work and their lives, and how the two influence each other day to day. Recent guests have included Trinidadian artist Richard Mark Rawlins, Shadow Lord Chancellor andShadow Justice Secretary David Lammy,and Angelina Coronado, who curates The Menagerie Archive on Instagram.",
    image: "url(https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/c5/b0/13/c5b013d4-1c47-f5a0-67a1-20357e86ae2b/mza_12038582178417231024.png/1200x1200bb.jpg)",
    imgText: "main image description",
    icon : HeadsetIcon,
    linkText: "Listen Now",
  };
  
  export const featuredPosts = [
    {
      title: "The First Emperor of China",
      date: "July 12",
      description:
        "Join Greg Jenner for a fun homeschool history lesson on the first Emperor of China, Qin Shi Huangdi, and the discovery of his world famous Terracotta Army",
      image: "http://ichef.bbci.co.uk/images/ic/3000x3000/p089jjkf.jpg",
      imageSize:"justify",
      imageText: "Image Text",
      icon : HeadsetIcon,
      linkText: "Listen Now",
    },
    {
      title: "Big Oil’s Big Crisis",
      date: " July 11",
      description:
        "From climate change to smoking and cancer. How would oil companies respond to the crisis posed by the long hot summer of 1988?",
      image: "https://ichef.bbci.co.uk/images/ic/1200x675/p08lc4sv.jpg",
      imageSize:"center",
      imageText: "Image Text",
      icon : HeadsetIcon,
      linkText: "Listen Now",
    },
  ];
  
  export const sidebar = {
    title: "About",
    align : "center",
    description:
      "With Podcast App, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.There are millions of tracks and episodes on Spotify. So whether you’re behind the wheel, working out, partying or relaxing, the right music or podcast is always at your fingertips. Choose what you want to listen to, or let Spotify surprise you. You can also browse through the collections of friends, artists, and celebrities, or create a radio station and just sit back.Soundtrack your life with Spotify. Subscribe or listen for free.",
    archives: [
      { title: "June 2021", url: "#" },
      { title: "May 2021", url: "#" },
      { title: "January 2021", url: "#" },
      { title: "November 2020", url: "#" },
      { title: "October 2020", url: "#" },
    ],
    social: [
      { name: "Instagram", icon: InstagramIcon },
      { name: "Twitter", icon: TwitterIcon },
      { name: "Facebook", icon: FacebookIcon },
    ],
  };