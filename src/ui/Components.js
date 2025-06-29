import styled, { css } from 'styled-components';
import { theme } from '../styles/theme';

// Base Button Component
export const Button = styled.button`
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  ${props => props.variant === 'primary' && css`
    background: linear-gradient(135deg, ${theme.colors.green.main} 0%, ${theme.colors.green.light} 100%);
    color: ${theme.colors.neutral.white};
    box-shadow: ${theme.shadows.lg};
    
    &:hover {
      box-shadow: ${theme.shadows.xl};
      transform: translateY(-2px);
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: rgba(255, 255, 255, 0.3);
    color: ${theme.colors.green.darker};
    border: 2px solid ${theme.colors.green.main};
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    
    &::before {
      background: linear-gradient(135deg, ${theme.colors.green.main}, ${theme.colors.green.dark});
      z-index: -1;
      left: 0;
      width: 0;
      transition: width 0.3s ease;
    }
    
    &:hover::before {
      width: 100%;
      left: 0;
    }
    
    &:hover {
      color: ${theme.colors.neutral.white};
      border-color: ${theme.colors.green.dark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
  
  ${props => props.size === 'large' && css`
    padding: ${theme.spacing.lg} ${theme.spacing.xxl};
    font-size: ${theme.typography.fontSize.lg};
  `}
  
  ${props => props.size === 'small' && css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  `}
`;

// Card Component
export const Card = styled.div`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }
`;

// Container Component
export const Container = styled.div`
  max-width: ${theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

// Typography Components
export const Heading1 = styled.h1`
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: 1.2;
  color: ${theme.colors.green.darker};
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.md};
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, ${theme.colors.green.main} 0%, ${theme.colors.green.dark} 30%, ${theme.colors.green.darker} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(1px 1px 2px rgba(255, 255, 255, 0.5));
`;

export const Subtitle = styled.p`
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: ${theme.typography.fontWeight.normal};
  line-height: 1.6;
  color: ${theme.colors.green.darker};
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;
