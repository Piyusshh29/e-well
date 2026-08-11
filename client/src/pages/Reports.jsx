import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import { Assessment, Timeline } from "@mui/icons-material";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const sleepData = [
  { name: 'Mon', hours: 7.2 },
  { name: 'Tue', hours: 6.8 },
  { name: 'Wed', hours: 8.1 },
  { name: 'Thu', hours: 7.5 },
  { name: 'Fri', hours: 5.4 },
  { name: 'Sat', hours: 9.2 },
  { name: 'Sun', hours: 8.5 },
];

const waterData = [
  { name: 'Mon', glasses: 6 },
  { name: 'Tue', glasses: 8 },
  { name: 'Wed', glasses: 7 },
  { name: 'Thu', glasses: 5 },
  { name: 'Fri', glasses: 9 },
  { name: 'Sat', glasses: 10 },
  { name: 'Sun', glasses: 8 },
];

export default function Reports() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Assessment sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Wellness Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your weekly insights and health trends at a glance.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Sleep Trends */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Timeline sx={{ color: '#8b5cf6', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">Weekly Sleep Trends</Typography>
              </Box>
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer>
                  <AreaChart data={sleepData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Water Intake */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Assessment sx={{ color: '#3b82f6', mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">Weekly Hydration</Typography>
              </Box>
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer>
                  <BarChart data={waterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar dataKey="glasses" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Stats */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 4, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold">7.5h</Typography>
              <Typography variant="subtitle1" opacity={0.8}>Avg. Sleep</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold">7.5</Typography>
              <Typography variant="subtitle1" opacity={0.8}>Avg. Glasses</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold">4</Typography>
              <Typography variant="subtitle1" opacity={0.8}>Workout Days</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold">92%</Typography>
              <Typography variant="subtitle1" opacity={0.8}>Goal Completion</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}