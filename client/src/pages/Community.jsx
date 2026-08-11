import { useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, IconButton, Divider, TextField, Button, Grid, Chip } from "@mui/material";
import { Forum, Favorite, FavoriteBorder, Share, ChatBubbleOutline } from "@mui/icons-material";

const DUMMY_POSTS = [
  { id: 1, user: "Sarah J.", avatar: "/avatars/1.jpg", time: "2h ago", content: "Just reached Level 5 in my Wellness RPG! Feeling amazing after prioritizing my sleep this week. 💤✨", likes: 24, liked: false, tag: "Achievement" },
  { id: 2, user: "Mike R.", avatar: "/avatars/2.jpg", time: "5h ago", content: "Does anyone have good tips for sticking to the water tracker? I keep forgetting to log it during work hours.", likes: 12, liked: true, tag: "Question" },
  { id: 3, user: "Elena M.", avatar: "/avatars/3.jpg", time: "1d ago", content: "Did a 10-minute meditation session using the E-WELL timer today. Highly recommend it if you're feeling stressed out!", likes: 56, liked: false, tag: "Tip" },
];

export default function Community() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [newPost, setNewPost] = useState("");

  const handleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      user: "You",
      avatar: "",
      time: "Just now",
      content: newPost,
      likes: 0,
      liked: false,
      tag: "General"
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Forum sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Community
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect, share tips, and celebrate milestones with others.
          </Typography>
        </Box>
      </Box>

      {/* Create Post */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handlePost} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>Y</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your wellness journey or ask a question..."
                variant="outlined"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" type="submit" disabled={!newPost.trim()} sx={{ borderRadius: 5, px: 3 }}>
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Feed */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card elevation={1} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={post.avatar} sx={{ bgcolor: 'secondary.main', mr: 2 }}>{post.user[0]}</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{post.user}</Typography>
                    <Typography variant="caption" color="text.secondary">{post.time}</Typography>
                  </Box>
                  <Chip label={post.tag} size="small" color="primary" variant="outlined" />
                </Box>
                
                <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    startIcon={post.liked ? <Favorite color="error" /> : <FavoriteBorder />} 
                    onClick={() => handleLike(post.id)}
                    sx={{ color: post.liked ? 'error.main' : 'text.secondary', textTransform: 'none' }}
                  >
                    {post.likes}
                  </Button>
                  <Button startIcon={<ChatBubbleOutline />} sx={{ color: 'text.secondary', textTransform: 'none' }}>
                    Reply
                  </Button>
                  <IconButton sx={{ ml: 'auto' }}>
                    <Share fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}